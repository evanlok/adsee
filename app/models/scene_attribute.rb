class SceneAttribute < ActiveRecord::Base
  SceneAttributeError = Class.new(StandardError)
  UnknownAttributeTypeError = Class.new(SceneAttributeError)
  ParseError = Class.new(SceneAttributeError)

  # Use strings to avoid circular autoloading errors
  TYPE_MAPPINGS = {
    text: 'SceneAttributes::Text',
    number: 'SceneAttributes::Number',
    boolean: 'SceneAttributes::Boolean',
    url: 'SceneAttributes::Text',
    image: 'SceneAttributes::Image',
    video: 'SceneAttributes::Video'
  }.freeze

  # Associations
  belongs_to :scene_content

  # Validations
  validates :scene_content, presence: true

  def self.policy_class
    SceneAttributePolicy
  end

  def self.from_type(type)
    raise UnknownAttributeTypeError, "Unknown scene attribute type: #{type}" unless TYPE_MAPPINGS[type.to_sym]
    TYPE_MAPPINGS[type.to_sym].constantize
  end

  def mapped_type
    TYPE_MAPPINGS.key(type).to_s
  end
end
