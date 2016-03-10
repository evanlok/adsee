module SceneAttributes
  class Boolean < SceneAttribute
    # Validations
    validates :value, inclusion: { in: %w(true false) }

    def value
      case self[:value]
      when 'true'
        true
      when 'false'
        false
      else
        raise ParseError, "Cannot parse boolean from value: #{self[:value]}"
      end
    end
  end
end
