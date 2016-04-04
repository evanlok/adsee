require 'webpack_assets_manifest'

module WebpackHelper
  def webpack_bundle_for(bundle)
    path = WebpackAssetsManifest.load.fetch(bundle)['js']
    javascript_include_tag path
  end
end
