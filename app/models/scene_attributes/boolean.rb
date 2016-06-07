module SceneAttributes
  class Boolean < SceneAttribute
    # Validations
    validates :value, inclusion: { in: [true, false] }

    def value=(val)
      self[:value] = val.to_s
    end

    def value
      case self[:value]
      when 'true', '1'
        true
      when 'false', '0'
        false
      else
        raise ParseError, "Cannot parse boolean from value: #{self[:value]}"
      end
    end

    def validatable?
      false
    end
  end
end
