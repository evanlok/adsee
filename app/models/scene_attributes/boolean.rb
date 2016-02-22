module SceneAttributes
  class Boolean < SceneAttribute
    # Validations
    validates :value, inclusion: { in: %w(true false) }

    def value
      case read_attribute(:value)
      when 'true'
        true
      when 'false'
        false
      else
        raise ParseError, "Cannot parse boolean from value: #{read_attribute(:value)}"
      end
    end
  end
end
