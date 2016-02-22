class CreateSceneCollections < ActiveRecord::Migration
  def change
    create_table :scene_collections do |t|
      t.belongs_to :user, index: true
      t.belongs_to :ad_type, index: true
      t.belongs_to :theme, index: true
      t.string :color
      t.belongs_to :font
      t.belongs_to :song

      t.timestamps null: false
    end
  end
end
