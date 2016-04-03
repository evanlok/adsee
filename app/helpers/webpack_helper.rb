require 'webpack_assets_loader'

module WebpackHelper
  def webpack_bundle_for(bundle)
    webpack_assets = Rails.application.config.preloaded_webpack_assets || WebpackAssetsLoader.load
    path = webpack_assets.fetch(bundle)['js']
    javascript_include_tag path
  end
end
