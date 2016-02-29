class CreateAdTypes < ActiveRecord::Migration
  def change
    create_table :ad_types do |t|
      t.string :name
      t.text :image
      t.belongs_to :industry, index: true
      t.string :category
      t.timestamps null: false
    end
  end
end
