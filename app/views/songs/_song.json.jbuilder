json.extract! song, :id, :name, :url, :updated_at
json.song_category song.song_category&.name || 'Uncategorized'
