class ProfileAnalysisReportWorker
  include Sidekiq::Worker

  BATCH_SIZE = 1000

  sidekiq_options retry: 1

  def initialize(report_id)
    @report = ProfileReport.find(report_id)
    @aggregates = Profiles::ReportAggregates.new
  end

  def perform
    raise 'No file to process on report' unless @report.file_url
    @report.processing!
    emails = []

    open_email_file do |file|
      # Check if first line is a header or row
      first_line = file.readline
      emails << first_line.strip.downcase if first_line.include?('@')

      until file.eof?
        line = file.readline
        next if line.blank?
        emails << line.strip.downcase

        if emails.length == BATCH_SIZE
          process_batch(emails)
          emails.clear
        end
      end

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

  def open_email_file
    tempfile = Tempfile.new('emails')
    source = open(@report.file_url)
    IO.copy_stream(source, tempfile)
    tempfile.rewind
    yield tempfile
  ensure
    tempfile.close!
  end
end
