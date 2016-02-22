module SceneAttributes
  class Number < SceneAttribute
    # Validations
    validates :value, numericality: true

    def value
      number = read_attribute(:value)
      if number =~ /\A\d*\.?\d*\z/
        number =~ /\./ ? number.to_f : number.to_i
      else
        raise ParseError, "Cannot parse number from value: #{read_attribute(:value)}"
      end
    end
  end
end
