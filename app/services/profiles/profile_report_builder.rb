module Profiles
  class ProfileReportBuilder
    Result = Struct.new(:created?, :error_messages)

    def initialize(profile_report, ad_account_id)
      @profile_report = profile_report
      @ad_account_id = ad_account_id
    end

    def create
      if @profile_report.save
        custom_audience_generator.create
        FacebookCustomAudienceWorker.perform_async(@profile_report.id, @ad_account_id)
        FullContactImportWorker.perform_async(@profile_report.id)
        Result.new(true)
      else
        Result.new(false, @profile_report.errors.full_messages)
      end
    end

    private

    def custom_audience_generator
      @custom_audience_generator ||= Facebook::CustomAudienceBuilder.new(@profile_report, @ad_account_id)
    end
  end
end
