class CreateVideoJobs < ActiveRecord::Migration
  def change
    create_table :video_jobs do |t|
      t.belongs_to :scene_collection, index: true
      t.string :hal_id, index: true

      t.timestamps null: false
    end
  end
end
