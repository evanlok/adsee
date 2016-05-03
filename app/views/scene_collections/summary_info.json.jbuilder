json.partial! 'scene_collection', scene_collection: @scene_collection
json.song @scene_collection.song&.name
json.font @scene_collection.font&.name

json.facebook_ad do
  json.partial! 'facebook_ads/facebook_ad', facebook_ad: @scene_collection.current_facebook_ad
  json.targeting_spec_name @scene_collection.facebook_targeting_specs.first&.name
end
