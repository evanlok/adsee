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
  end

  factory :industry do
    name { Faker::Lorem.word }
    image { build(:image) }
  end

  factory :ad_type do
    name { Faker::Lorem.word }
    industry
    image { build(:image) }
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

  factory :image, class: Rack::Test::UploadedFile do
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
end
