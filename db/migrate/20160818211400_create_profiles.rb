class CreateProfiles < ActiveRecord::Migration
  def up
    create_table :profiles do |t|
      t.string :email
      t.jsonb :data

      t.timestamps null: false
    end

    add_index :profiles, :email, unique: true
  end

  def down
    drop_table :profiles
  end
end
