require 'json'

class WebpackAssetsManifest
  def self.load(path = Rails.public_path.join('assets', 'webpack-assets.json'))
    if Rails.application.config.cache_webpack_assets_manifest
      @webpack_manifest ||= parse_file(path)
    else
      parse_file(path)
    end
  end

  def self.parse_file(path)
    if File.exist?(path)
      file = File.read(path)
      JSON.parse(file)
    else
      {}
    end
  end
end
