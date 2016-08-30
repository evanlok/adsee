class AddCustomAudienceIdToProfileReports < ActiveRecord::Migration
  def change
    add_column :profile_reports, :custom_audience_id, :string
  end
end
