class CreateAdseeAdtypes < ActiveRecord::Migration
  def change
    create_table :adsee_adtypes do |t|
      t.string :name
      t.text :image_url
      t.integer :industry_id
      t.string :ad_type
      t.timestamps null: false
    end
  add_index :adsee_adtypes, :industry_id, using: :btree
  end
end
