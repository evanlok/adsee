FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password 'test1234'

    trait :admin do
      admin true
    end
  end

  factory :scene do
    name { Faker::Lorem.words }
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
end
