class AddThumbnailAndDescriptionToTargetingSpecs < ActiveRecord::Migration
  def change
    add_column :facebook_targeting_specs, :thumbnail, :string
    add_column :facebook_targeting_specs, :description, :text
  end
end
