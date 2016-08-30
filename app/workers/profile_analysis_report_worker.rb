class ProfileAnalysisReportWorker
  include Sidekiq::Worker

  BATCH_SIZE = 1000

  sidekiq_options retry: 1

  def perform(report_id)
    @report = ProfileReport.find(report_id)
    @aggregates = Profiles::ReportAggregates.new

    raise 'No file to process on report' unless @report.file_url
    @report.processing!

    @report.emails_in_batches(BATCH_SIZE) do |emails|
      process_batch(emails)
    end

    @report.status = :processed
    @report.update(@aggregates.as_json)
  end

  private

  def process_batch(emails)
    results = Profiles::AggregateCalculator.new(emails).run
    @aggregates.merge!(results)
  end
end
