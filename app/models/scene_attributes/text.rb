module SceneAttributes
  class Text < SceneAttribute
    validates :value, presence: true
  end
end
