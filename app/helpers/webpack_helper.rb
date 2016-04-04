require 'webpack_assets_manifest'

module WebpackHelper
  def webpack_bundle_for(bundle, type = :js)
    path = WebpackAssetsManifest.load.fetch(bundle)[type.to_s]

    case type
    when :js
      javascript_include_tag path
    when :css
      stylesheet_link_tag path
    end
  end
end
