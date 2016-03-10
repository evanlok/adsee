class SceneAttribute < ActiveRecord::Base
  UnknownAttributeTypeError = Class.new(StandardError)
  ParseError = Class.new(StandardError)

  # Use strings to avoid circular autoloading errors
  TYPE_MAPPINGS = {
    text: 'SceneAttributes::Text',
    number: 'SceneAttributes::Number',
    boolean: 'SceneAttributes::Boolean',
    image: 'SceneAttributes::Image',
    video: 'SceneAttributes::Video'
  }.freeze

  # Associations
  belongs_to :scene_content

  # Validations
  validates :scene_content, :value, presence: true

  def self.from_type(type)
    raise UnknownAttributeTypeError, "Unknown scene attribute type: #{type}" unless TYPE_MAPPINGS[type.to_sym]
    TYPE_MAPPINGS[type.to_sym].constantize
  end
end
