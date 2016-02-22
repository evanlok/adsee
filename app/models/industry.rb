class Industry < ActiveRecord::Base
  has_many :adsee_adtypes


  def as_json(options={})
    super({ only: [:id, :name, :image_url]})
  end

end