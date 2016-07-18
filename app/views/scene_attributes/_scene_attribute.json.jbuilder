json.extract! scene_attribute, :id, :name, :value, :scene_content_id, :config

if scene_attribute.class.in?([SceneAttributes::Image, SceneAttributes::Video])
  json.filename scene_attribute.attachment.filename
  json.attachment_id scene_attribute.attachment_id
  json.attachment_type scene_attribute.attachment_type
  json.thumbnail_url scene_attribute.attachment.thumbnail_url
end

if scene_attribute.class == SceneAttributes::Video
  json.duration scene_attribute.attachment.duration
end

if scene_attribute.class == SceneAttributes::Icon
  json.attachment_id scene_attribute.attachment_id
  json.attachment_type scene_attribute.attachment_type
  json.icon_name scene_attribute.attachment&.name
  json.icon_url scene_attribute.attachment&.url
end

json.type scene_attribute.mapped_type
