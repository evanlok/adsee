json.extract! scene_collection, :id, :color

json.song do
  json.id scene_collection.song&.id
  json.name scene_collection.song&.name
end

json.theme do
  json.id scene_collection.theme&.id
  json.id scene_collection.theme&.name
end
