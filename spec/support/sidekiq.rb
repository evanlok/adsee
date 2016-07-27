# Temporarily work around a clash between rspec-rails 3.4.0 and
# rspec-sidekiq because of new ActiveJob matchers.
#
# See philostler/rspec-sidekiq#83
module RSpec
  module Sidekiq
    module Matchers
      def have_enqueued_sidekiq_job(*expected_arguments)
        HaveEnqueuedSidekiqJob.new expected_arguments
      end

      HaveEnqueuedSidekiqJob = HaveEnqueuedJob
    end
  end
end
