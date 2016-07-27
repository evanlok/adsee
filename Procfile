web: bundle exec puma -C config/puma.rb
worker: DB_POOL=$SIDEKIQ_CONCURRENCY bundle exec sidekiq
