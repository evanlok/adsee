class SongCategory < ActiveRecord::Base
  # Associations
  has_many :songs, dependent: :nullify

  # Validations
  validates :name, presence: true
end
