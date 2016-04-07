class CreateFonts < ActiveRecord::Migration
  def change
    create_table :fonts do |t|
      t.string :name
      t.text :url

      t.timestamps null: false
    end
  end
end
