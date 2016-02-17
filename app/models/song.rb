class Song < ActiveRecord::Base
  # Associations
  has_many :themes, dependent: :nullify

  # Validations
  validates :name, :url, presence: true
end
