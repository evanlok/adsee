require 'json'

class WebpackAssetsLoader
  def self.load
    path = Rails.public_path.join('assets', 'webpack-assets.json')

    if File.exist?(path)
      file = File.read(path)
      JSON.parse(file)
    else
      {}
    end
  end
end
