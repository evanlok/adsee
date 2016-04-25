json.extract! scene, :id, :name
json.thumbnail_url scene.thumbnail.url(:large)
json.thumbnail_small_url scene.thumbnail.url(:small)
json.preview_video_url scene.preview_video.url
json.category scene.scene_category&.name
