
class AdseeAdtype < ActiveRecord::Base
  belongs_to :industry

   def as_json(options={})
    super({ only: [:id, :name, :image_url]})
  end

end