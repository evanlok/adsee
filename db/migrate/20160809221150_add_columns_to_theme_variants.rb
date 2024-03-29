class AddColumnsToThemeVariants < ActiveRecord::Migration
  def change
    add_column :theme_variants, :name, :string
    add_column :theme_variants, :photo_count, :integer, default: 0
    add_column :theme_variants, :video_count, :integer, default: 0
    add_column :theme_variants, :thumbnail, :text
    add_column :theme_variants, :sample_video, :text
    add_column :theme_variants, :poster_image, :text
    add_column :theme_variants, :aspect_ratio, :string
    add_column :theme_variants, :position, :integer

    ThemeVariant.reset_column_information
    ThemeVariant.find_each { |theme_variant| theme_variant.insert_at(1) }
  end
end
