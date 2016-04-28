json.extract! scene_collection, :id, :color, :font_id, :song_id

json.industry scene_collection.ad_type&.industry&.name
json.ad_type scene_collection.ad_type&.name
json.theme scene_collection.theme&.name
json.facebook_targeting_spec_ids scene_collection.facebook_targeting_spec_ids
