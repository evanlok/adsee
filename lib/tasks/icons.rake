namespace :icons do
  desc 'Import icon names from Google Material Icons'
  task import: :environment do
    url = 'https://raw.githubusercontent.com/google/material-design-icons/master/iconfont/codepoints'
    icon_list = Faraday.get(url).body

    position = 1

    icon_list.each_line do |line|
      name, unicode = line.split(' ')
      icon = Icon.where(name: name, vendor: Icon::GOOGLE).first_or_initialize
      icon.unicode = unicode
      icon.position = position
      icon.save
      position += 1
    end

    emoji_json = JSON.parse(open('https://raw.githubusercontent.com/Ranks/emojione/master/emoji.json').read)

    emoji_json.each do |name, data|
      icon = Icon.where(name: name, vendor: Icon::EMOJIONE).first_or_initialize
      icon.category = data['category']
      icon.unicode = data['unicode']
      icon.position = data['emoji_order']
      icon.save
    end
  end
end
