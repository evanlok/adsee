json.array! @industries do |industry|
  json.extract! industry, :id, :name, :description
  json.image_url_small industry.image_url(:small)
  json.image_url_large industry.image_url(:large)
  json.image_url_small_square industry.image_url(:small_square)
  json.image_url_large_square industry.image_url(:large_square)
end
