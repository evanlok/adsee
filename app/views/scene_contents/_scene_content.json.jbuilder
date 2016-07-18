json.extract! scene_content, :id, :scene_id, :scene_collection_id, :position, :transition_id, :transition_duration

json.scene do
  json.partial! 'scenes/scene', scene: scene_content.scene
end

json.transition_name scene_content.transition&.name

json.scene_attributes scene_content.scene.data_attributes do |data_attribute|
  scene_attr = scene_content.scene_attributes.find { |scene_attr| scene_attr.name == data_attribute['name'] }

  if scene_attr
    json.partial! 'scene_attributes/scene_attribute', scene_attribute: scene_attr
  else
    json.id nil
    json.value nil
    json.name data_attribute['name']
    json.type data_attribute['type']
  end

  json.display_name data_attribute['display_name']
  json.position data_attribute['position']
end
