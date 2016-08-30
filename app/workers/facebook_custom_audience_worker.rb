class FacebookCustomAudienceWorker
  include Sidekiq::Worker

  sidekiq_options retry: 3

  def perform(report_id, ad_account_id)
    @profile_report = ProfileReport.find(report_id)
    @ad_account_id = ad_account_id

    custom_audience_generator.create_and_add_users
  end

  private

  def custom_audience_generator
    Facebook::CustomAudienceBuilder.new(@profile_report, @ad_account_id)
  end
end
