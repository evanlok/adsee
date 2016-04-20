class RemoveHalIdFromVideoJobs < ActiveRecord::Migration
  def change
    remove_column :video_jobs, :hal_id
  end
end
