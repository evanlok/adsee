class AddStreamUrlToVideoJobs < ActiveRecord::Migration
  def change
    add_column :video_jobs, :stream_url, :text
  end
end
