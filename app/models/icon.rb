class Icon < ActiveRecord::Base
  include PgSearch

  GOOGLE = 'google'.freeze
  EMOJIONE = 'emojione'.freeze

  pg_search_scope :search,
                  against: [:name],
                  using: {
                    tsearch: { prefix: true, dictionary: 'english' }
                  }

  # Validations
  validates :name, presence: true

  def url
    case vendor
    when GOOGLE
      "https://d15t32v9fjxgrp.cloudfront.net/icons/google/ic_#{name}_black_48dp.png"
    when EMOJIONE
      "https://d15t32v9fjxgrp.cloudfront.net/icons/emojione/#{unicode}.png"
    end
  end
end
