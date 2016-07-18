class ThumbnailUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  process convert: 'jpg'

  # Create different versions of your uploaded files:
  version :small_square, from_version: :large_square do
    process resize_to_fill: [100, 100]
  end

  version :large_square do
    process resize_to_fill: [200, 200]
  end

  version :small, from_verison: :large do
    process resize_to_fill: [160, 90]
  end

  version :large do
    process resize_to_fill: [320, 180]
  end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  def filename
    super.chomp(File.extname(super)) + '.jpg' if original_filename.present?
  end
end
