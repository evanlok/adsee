json.extract! theme, :id, :name, :description, :color, :song_id, :font_id, :ad_type_id, :created_at, :updated_at

json.ad_type theme.ad_type.name
json.industry theme.ad_type.industry.name
json.song theme.song&.name
json.font theme.font&.name

json.thumbnail_url_small theme.thumbnail_url(:small)
json.thumbnail_url_large theme.thumbnail_url(:large)
json.thumbnail_url_small_square theme.thumbnail_url(:small_square)
json.thumbnail_url_large_square theme.thumbnail_url(:large_square)

json.theme_variants theme.theme_variants do |theme_variant|
  json.extract! theme_variant, :id, :name, :sample_video_url, :photo_count, :video_count, :duration, :aspect_ratio,
                :position, :created_at, :updated_at

  json.video_type theme_variant.video_type.name

  json.thumbnail_url_small theme_variant.thumbnail_url(:small)
  json.thumbnail_url_large theme_variant.thumbnail_url(:large)
  json.thumbnail_url_small_square theme_variant.thumbnail_url(:small_square)
  json.thumbnail_url_large_square theme_variant.thumbnail_url(:large_square)

  json.poster_image_url_small theme_variant.poster_image_url(:small)
  json.poster_image_url_small_square theme_variant.poster_image_url(:small_square)
  json.poster_image_url_medium theme_variant.poster_image_url(:medium)
  json.poster_image_url_large theme_variant.poster_image_url(:large)
end
