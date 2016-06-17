class CreateIcons < ActiveRecord::Migration
  def change
    create_table :icons do |t|
      t.string :name, index: true
      t.string :unicode
      t.string :category
      t.string :vendor
      t.integer :position

      t.timestamps null: false
    end
  end
end
