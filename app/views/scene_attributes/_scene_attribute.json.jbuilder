json.extract! scene_attribute, :id, :name, :value, :scene_content_id

if scene_attribute.class.in?([SceneAttributes::Image, SceneAttributes::Video])
  json.filename scene_attribute.attachment.filename
  json.attachment_id scene_attribute.attachment_id
  json.attachment_type scene_attribute.attachment_type
end

json.type scene_attribute.mapped_type
