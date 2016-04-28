json.array! @facebook_targeting_specs do |facebook_targeting_spec|
  json.extract! facebook_targeting_spec, :id, :name, :description, :data
  json.thumbnail_url facebook_targeting_spec.thumbnail.url(:large_square)
  json.thumbnail_small_url facebook_targeting_spec.thumbnail.url(:small_square)
end
