class SceneContent < ActiveRecord::Base
  acts_as_list scope: :scene_collection_id

  # Associations
  belongs_to :scene
  belongs_to :scene_collection, inverse_of: :scene_contents
  belongs_to :transition
  has_many :scene_attributes, dependent: :delete_all

  # Validations
  validates :scene, :scene_collection, presence: true

  def valid_attributes?
    scene_attributes_by_name = scene_attributes.index_by(&:name)

    scene.data_attributes.all? do |attr|
      scene_attribute = scene_attributes_by_name[attr['name']]

      if scene_attribute
        scene_attribute.valid? && scene_attribute.is_a?(SceneAttribute.from_type(attr['type']))
      else
        false
      end
    end
  end
end
