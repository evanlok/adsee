class FullContactImportWorker
  include Sidekiq::Worker

  BATCH_SIZE = 1000

  sidekiq_options retry: 3

  def perform(report_id)
    @report = ProfileReport.find(report_id)

    @report.emails_in_batches(BATCH_SIZE) do |emails|
      importer = Profiles::FullContactImporter.new
      importer.import(emails)
    end

    ProfileAnalysisReportWorker.perform_async(@report.id)
  end
end
