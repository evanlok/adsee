class Icon < ActiveRecord::Base
  include PgSearch

  pg_search_scope :search,
                  against: [:name],
                  using: {
                    tsearch: { prefix: true, dictionary: 'english' }
                  }

  # Validations
  validates :name, presence: true
end
