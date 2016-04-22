module SceneAttributes
  class Image < SceneAttribute
    # Validations
    validates :attachment_id, :attachment_type, presence: true
    validate :attachment_is_image?

    def value
      URI.encode(attachment.url)
    end

    def value=(val)
      self.attachment = ::Image.find_by(id: val)
    end

    private

    def attachment_is_image?
      errors.add(:attachment, 'is not a valid type') unless attachment.is_a?(::Image)
    end
  end
end
