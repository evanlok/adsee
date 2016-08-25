class AddFilePathToProfileReports < ActiveRecord::Migration
  def change
    add_column :profile_reports, :file_path, :text
    remove_column :profile_reports, :attachment, :text
  end
end
