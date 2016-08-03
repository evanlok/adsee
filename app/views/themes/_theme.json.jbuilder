json.extract! theme, :id, :name, :description, :photo_count, :video_count, :color, :sample_video_url, :song_id,
              :font_id, :created_at, :updated_at

json.thumbnail_url_small theme.thumbnail_url(:small)
json.thumbnail_url_large theme.thumbnail_url(:large)
json.thumbnail_url_small_square theme.thumbnail_url(:small_square)
json.thumbnail_url_large_square theme.thumbnail_url(:large_square)

json.poster_image_url_small theme.poster_image_url(:small)
json.poster_image_url_small_square theme.poster_image_url(:small_square)
json.poster_image_url_medium theme.poster_image_url(:medium)
json.image_url_large theme.poster_image_url(:large)