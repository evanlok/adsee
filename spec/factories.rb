FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password 'test1234'

    trait :admin do
      admin true
    end

    trait :facebook do
      facebook_oauth_token { SecureRandom.hex }
      facebook_oauth_expires_at { 60.days.from_now }
      provider 'Facebook'
      sequence(:uid) { |n| n }
    end
  end

  factory :scene do
    name { Faker::Lorem.sentence }
    sequence(:hal_id) { |n| n }

    data_attributes do
      [
        {
          name: 'city',
          display_name: 'City',
          type: 'text'
        },
        {
          name: 'state',
          display_name: 'State',
          type: 'text'
        }
      ]
    end
  end

  factory :scene_collection do
    user
    color '#000000'
  end

  factory :scene_content do
    scene
    scene_collection
    transition
    transition_duration 2.5
  end

  factory :scene_attribute do
    scene_content
    sequence(:name) { |n| "attr#{n}" }

    factory :text_attribute, class: SceneAttributes::Text do
      value { Faker::Lorem.sentence }
    end

    factory :number_attribute, class: SceneAttributes::Number do
      value '50'
    end

    factory :boolean_attribute, class: SceneAttributes::Boolean do
      value 'true'
    end

    factory :image_attribute, class: SceneAttributes::Image do
      association :attachment, factory: :image
    end

    factory :video_attribute, class: SceneAttributes::Video do
      association :attachment, factory: :video_clip
    end
  end

  factory :industry do
    name { Faker::Lorem.word }
    image { build(:uploaded_image) }
  end

  factory :ad_type do
    name { Faker::Lorem.word }
    industry
    image { build(:uploaded_image) }
  end

  factory :theme do
    name { Faker::Lorem.sentence }
    description { Faker::Lorem.sentence }
    photo_count { Faker::Number.number(1) }
    ad_type
  end

  factory :theme_variant do
    theme
    video_type
    duration { Faker::Number.number(2) }
  end

  factory :video_type do
    name { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
  end

  factory :uploaded_image, class: Rack::Test::UploadedFile do
    initialize_with do
      FileUtils.mkdir_p(Rails.root.join('tmp', 'test-files'))
      file = File.new(Rails.root.join('tmp', 'test-files', 'image.jpg'), 'wb')
      file.close
      Rack::Test::UploadedFile.new(file.path)
    end
  end

  factory :transition do
    name { Faker::Lorem.word }
    value { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
  end

  factory :font do
    name { Faker::Lorem.sentence }
    url { Faker::Internet.url }
  end

  factory :song do
    name { Faker::Lorem.sentence }
    url { Faker::Internet.url }
  end

  factory :video_job do
    scene_collection
  end

  factory :image do
    filename { "#{Faker::Lorem.word}.jpg" }
    original_path 'original_path/to/file'
    path 'path/to/file'
    thumbnail_path 'thumbnail_path/to/file'
    file_size 50_000
    filestack_url 'https://www.filestack/image'
    user
  end

  factory :video_clip do
    filename { "#{Faker::Lorem.word}.mp4" }
    original_path 'original_path/to/file'
    thumbnail_url { Faker::Internet.url }
    file_size 50_000
    filestack_url 'https://www.filestack/image'
    user
  end

  factory :facebook_targeting_spec do
    name 'US'
    data do
      { geo_locations: { countries: ['US'] } }
    end
  end

  factory :facebook_ad do
    scene_collection
    ad_account_id 'act_12345'
    page_id '45678'
    campaign_name 'AdSee'
    ad_set_name 'AdSee AdSet'
    optimization_goal 'VIDEO_VIEWS'
    billing_event 'IMPRESSIONS'
    budget_type 'lifetime'
    budget 5000
    start_time { 1.day.from_now }
    end_time { 30.days.from_now }
    pacing_type 'standard'
  end

  factory :video do
    scene_collection
    url { Faker::Internet.url }
    duration 30
    width 1280
    height 720
    thumbnail_url { Faker::Internet.url }
  end
end
