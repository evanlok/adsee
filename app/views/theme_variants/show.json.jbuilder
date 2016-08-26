json.partial! 'theme_variant', theme_variant: @theme_variant

json.theme do
  json.extract! @theme_variant.theme, :id, :name, :description
  json.ad_type @theme_variant.theme.ad_type.name
  json.industry @theme_variant.theme.ad_type.industry.name
  json.song @theme_variant.theme.song&.name
  json.font @theme_variant.theme.font&.name

  json.thumbnail_url_small @theme_variant.theme.thumbnail_url(:small)
  json.thumbnail_url_large @theme_variant.theme.thumbnail_url(:large)
  json.thumbnail_url_small_square @theme_variant.theme.thumbnail_url(:small_square)
  json.thumbnail_url_large_square @theme_variant.theme.thumbnail_url(:large_square)
end
