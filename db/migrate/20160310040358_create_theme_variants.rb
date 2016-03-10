class CreateThemeVariants < ActiveRecord::Migration
  def change
    create_table :theme_variants do |t|
      t.belongs_to :theme
      t.belongs_to :video_type
      t.integer :duration, default: 0

      t.timestamps null: false
    end

    add_index :theme_variants, [:theme_id, :video_type_id], unique: true
  end
end
