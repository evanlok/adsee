class Filter < ActiveRecord::Base
  mount_uploader :image, FileUploader

  # Validations
  validates :name, :value, presence: true
  validates :value, uniqueness: true
end
