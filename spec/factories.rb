FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password 'test1234'

    trait :admin do
      admin true
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
end
