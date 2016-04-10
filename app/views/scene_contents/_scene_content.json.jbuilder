json.extract! scene_content, :id, :scene_id, :scene_collection_id, :position, :transition, :transition_duration

json.scene do
  json.id scene_content.scene.id
  json.name scene_content.scene.name
  json.thumbnail_url scene_content.scene.thumbnail.url(:large)
  json.preview_video_url scene_content.scene.preview_video.url
end

json.scene_attributes scene_content.scene.data_attributes do |data_attribute|
  scene_attr = scene_content.scene_attributes.find { |scene_attr| scene_attr.name == data_attribute['name'] }

  if scene_attr
    json.extract! scene_attr, :id, :value
  else
    json.id nil
    json.value nil
  end

  json.name data_attribute['name']
  json.type data_attribute['type']
  json.display_name data_attribute['display_name']
end
