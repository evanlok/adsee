class CreateProfileReports < ActiveRecord::Migration
  def change
    create_table :profile_reports do |t|
      t.string :name
      t.text :description
      t.belongs_to :user
      t.text :attachment
      t.integer :status, default: 0
      t.integer :total, default: 0
      t.integer :matched, default: 0
      t.integer :male, default: 0
      t.integer :female, default: 0
      t.integer :name, default: 0
      t.integer :age, default: 0
      t.integer :gender, default: 0
      t.integer :photo, default: 0
      t.integer :linkedin, default: 0
      t.integer :facebook, default: 0
      t.integer :twitter, default: 0
      t.integer :pinterest, default: 0
      t.integer :location, default: 0
      t.integer :company, default: 0
      t.integer :interests, default: 0
      t.jsonb :ages, default: {}
      t.jsonb :age_ranges, default: {}
      t.jsonb :states, default: {}
      t.jsonb :countries, default: {}

      t.timestamps null: false
    end
  end
end
