class CreateFacebookTargetingSpecs < ActiveRecord::Migration
  def change
    create_table :facebook_targeting_specs do |t|
      t.string :name
      t.jsonb :data

      t.timestamps null: false
    end
  end
end
