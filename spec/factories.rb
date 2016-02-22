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
    transition 'fade'
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
end
