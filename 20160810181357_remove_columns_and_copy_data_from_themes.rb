class RemoveColumnsAndCopyDataFromThemes < ActiveRecord::Migration
  def up
    Theme.includes(:theme_variants).find_each do |theme|
      theme.theme_variants.each do |theme_variant|
        theme_variant.photo_count = theme.photo_count
        theme_variant.video_count = theme.video_count

        if CarrierWave::Uploader::Base.storage == CarrierWave::Storage::AWS
          theme_variant.remote_thumbnail_url = theme.thumbnail_url
          theme_variant.remote_sample_video_url = theme.sample_video_url
          theme_variant.remote_poster_image_url = theme.poster_image_url
        else
          theme_variant.thumbnail = theme.thumbnail.file&.to_file
          theme_variant.sample_video = theme.sample_video.file&.to_file
          theme_variant.poster_image = theme.poster_image.file&.to_file
        end

        theme_variant.aspect_ratio = theme_variant.scenes.first&.aspect_ratio || '16:9'
        theme_variant.save(validate: false)
      end
    end

    remove_column :themes, :photo_count
    remove_column :themes, :video_count
  end

  def down
    add_column :themes, :photo_count, :integer, default: 0
    add_column :themes, :video_count, :integer, default: 0
  end
end
