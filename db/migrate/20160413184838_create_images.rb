class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :filename
      t.text :original_path
      t.text :path
      t.text :thumbnail_path
      t.integer :file_size
      t.text :filestack_url
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
  end
end
