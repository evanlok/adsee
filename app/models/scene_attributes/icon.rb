module SceneAttributes
  class Icon < SceneAttribute
    # Validations
    validate :attachment_is_valid_type?, if: :attachment

    def value
      URI.encode(attachment.url)
    end

    def value=(val)
      self.attachment = ::Icon.find_by!(id: val)
    end

    def image_id=(val)
      self.attachment = ::Image.find_by!(id: val)
    end

    def attachment_name
      attachment.is_a?(::Icon) ? attachment&.name : attachment&.filename
    end

    private

    def attachment_is_valid_type?
      return if attachment.is_a?(::Icon) || attachment.is_a?(::Image)
      errors.add(:attachment, 'is not a valid type')
    end
  end
end
