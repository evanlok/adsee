class AddPreviewToVideoJobs < ActiveRecord::Migration
  def change
    add_column :video_jobs, :preview, :boolean, default: false
  end
end
