module SceneAttributes
  class Number < SceneAttribute
    # Validations
    validates :value, numericality: true

    def value
      number = self[:value]
      raise ParseError, "Cannot parse number from value: #{self[:value]}" unless number =~ /\A\d*\.?\d*\z/
      number =~ /\./ ? number.to_f : number.to_i
    end
  end
end
