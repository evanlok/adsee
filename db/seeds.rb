require 'faker'

uploads_dir = Rails.root.join('public', 'uploads')
FileUtils.rm_rf(uploads_dir) if Dir.exist?(uploads_dir)

User.create(
    email: 'admin@adsee.com',
    password: 'test1234',
    first_name: 'AdSee',
    last_name: 'Admin',
    admin: true
)

5.times do |i|
  Song.create(name: "Song #{i+1}", url: "https://s3.amazonaws.com/vejeo-stage/vidgenie/audio/music/energetic/energetic-#{i+1}.mp3")
  Font.create(name: "Font #{i+1}", url: "https://www.adsee.com/font-#{i+1}.ttf")
end

['Real Estate', 'Automotive', 'Restaurant'].each do |name|
  industry = Industry.create(name: name, remote_image_url: 'http://lorempixel.com/320/180/city')

  3.times do |i|
    ad_type = AdType.create(industry: industry, name: Faker::Commerce.product_name, remote_image_url: 'http://lorempixel.com/320/180/city')

    Theme.create(
        name: Faker::Commerce.product_name,
        description: Faker::Lorem.paragraph,
        photo_count: rand(3..10),
        ad_type: ad_type,
        song: Song.order('random()').first,
        font: Font.order('random()').first,
        remote_thumbnail_url: 'http://lorempixel.com/320/180/city',
        remote_poster_image_url: 'http://lorempixel.com/1280/720/city'
    )
  end
end

{
    SlideUp: 'Slide Up',
    SlideDown: 'Slide Down',
    FadeIn: 'Fade In',
    FadeOut: 'Fade Out'
}.each do |k, v|
  Transition.create(name: v, value: k)
end

%w(YouTube Facebook Twitter).each do |name|
  VideoType.create(name: name)
end

%w(Intro Middle Outro).each do |name|
  SceneCategory.create(name: name)
end

# Import scenes
ScenesImporter.new.import

Scene.find_each do |scene|
  scene.update(remote_thumbnail_url: 'http://lorempixel.com/320/180/city', scene_category: SceneCategory.order('random()').first)
end

Theme.find_each do |theme|
  theme_variant = ThemeVariant.create(theme: theme, video_type: VideoType.order('random()').first, duration: rand(15..60))

  Scene.order('random()').limit(5).each do |scene|
    ThemeVariantScene.create(theme_variant: theme_variant, scene: scene)
  end
end
