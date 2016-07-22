json.array! @icons do |icon|
  json.extract! icon, :id, :name, :vendor
  json.type 'icon'
end
