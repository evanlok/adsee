class Theme < ActiveRecord::Base
  # Associations
  belongs_to :song
  has_many :theme_scenes, -> { order(:position) }, dependent: :destroy
  has_many :scenes, through: :theme_scenes

  # Validations
  validates :name, presence: true

  accepts_nested_attributes_for :theme_scenes, reject_if: proc { |attr| attr[:scene_id].blank? }, allow_destroy: true
end
