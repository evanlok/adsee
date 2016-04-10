class CreateTransitions < ActiveRecord::Migration
  def change
    create_table :transitions do |t|
      t.string :name
      t.string :value
      t.text :description

      t.timestamps null: false
    end
  end
end
