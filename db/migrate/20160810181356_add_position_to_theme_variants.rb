class AddPositionToThemeVariants < ActiveRecord::Migration
  def up
    add_column :theme_variants, :position, :integer
    ThemeVariant.find_each { |theme_variant| theme_variant.insert_at(1) }
  end

  def down
    remove_column :theme_variants, :position
  end
end
