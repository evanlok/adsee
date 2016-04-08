json.extract! scene_content, :id, :scene_id, :scene_collection_id, :position, :transition, :transition_duration

json.scene do
  json.id scene_content.scene.id
  json.name scene_content.scene.name
  json.data_attributes scene_content.scene.data_attributes
  json.thumbnail_url scene_content.scene.thumbnail.url(:large)
  json.preview_video_url scene_content.scene.preview_video.url
end
