class CreateFilters < ActiveRecord::Migration
  def change
    create_table :filters do |t|
      t.string :name
      t.string :value
      t.text :image

      t.timestamps null: false
    end
  end
end
