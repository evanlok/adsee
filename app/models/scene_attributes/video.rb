module SceneAttributes
  class Video < SceneAttribute
    # Validations
    validates :attachment_id, :attachment_type, presence: true
    validate :attachment_is_video?

    def value
      attachment.url
    end

    def value=(val)
      self.attachment = VideoClip.find_by(id: val)
    end

    private

    def attachment_is_video?
      errors.add(:attachment, 'is not a valid type') unless attachment.is_a?(VideoClip)
    end
  end
end
