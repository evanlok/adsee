json.array! @ad_types do |ad_type|
  json.extract! ad_type, :id, :name
  json.image_url_small ad_type.image_url(:small)
  json.image_url_large ad_type.image_url(:large)
  json.image_url_small_square ad_type.image_url(:small_square)
  json.image_url_large_square ad_type.image_url(:large_square)
end
