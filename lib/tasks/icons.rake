namespace :icons do
  desc 'Import icon names from Google Material Icons'
  task import: :environment do
    url = 'https://raw.githubusercontent.com/google/material-design-icons/master/iconfont/codepoints'
    icon_list = Faraday.get(url).body

    icon_list.each_line do |line|
      name = line.split(' ').first
      Icon.where(name: name).first_or_create
    end
  end
end
