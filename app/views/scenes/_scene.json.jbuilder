json.extract! scene, :id, :name, :width, :height
json.thumbnail_url scene.thumbnail.url(:large)
json.thumbnail_small_url scene.thumbnail.url(:small)
json.preview_video_url scene.preview_video.url
json.guide_video_url scene.guide_video.url
json.category scene.scene_category&.name
