json.array! @theme_recommendation_groups do |group|
  json.extract! group, :id, :title, :description

  json.themes group.themes do |theme|
    json.partial! 'themes/theme', theme: theme
  end
end
