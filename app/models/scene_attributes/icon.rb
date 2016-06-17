module SceneAttributes
  class Icon < SceneAttribute
    # Validations
    validate :attachment_is_icon?, if: :attachment

    def value
      attachment.url
    end

    def value=(val)
      self.attachment = ::Icon.find_by!(id: val)
    end

    private

    def attachment_is_icon?
      errors.add(:attachment, 'is not a valid type') unless attachment.is_a?(::Icon)
    end
  end
end
