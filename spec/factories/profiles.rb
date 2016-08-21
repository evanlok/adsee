FactoryGirl.define do
  factory :profile do
    email { Faker::Internet.email }
    data do
      { 'status' => 200,
        'likelihood' => 0.9,
        'requestId' => '773e6782-62bb-4fc6-9f38-28ea0b5db261',
        'photos' =>
          { 'twitter' =>
              [{ 'url' =>
                   'https://d2ojpxxtu63wzl.cloudfront.net/static/ecf57683e2c22abb296f822377597290_fe346265298c3d008a4af9c54483809f55508dd4c238789dc9a115ae8395c381',
                 'typeName' => 'Twitter',
                 'isPrimary' => false }],
            'quora' =>
              [{ 'url' =>
                   'https://d2ojpxxtu63wzl.cloudfront.net/image/8aeb64288905cbc9e73678eab24032d4_260589322c246c2e8aef934f234b4fc0c33a437e247dc80f6f9b909d2a2ba990',
                 'typeName' => 'Quora' }],
            'foursquare' =>
              [{ 'url' =>
                   'https://d2ojpxxtu63wzl.cloudfront.net/static/ac4cac11df61b43c503d4c3101604742_80a63ae50b5cc0e8f9dacb522547d923f1b3961ca666fd661fb2b3f5656a644d',
                 'typeName' => 'Foursquare',
                 'isPrimary' => false }],
            'googleplus' =>
              [{ 'url' =>
                   'https://d2ojpxxtu63wzl.cloudfront.net/static/a508fc51b2d287175f36a44aead7438a_6be07253a0bbaf5929d148cc2fca7f266ffd41a1053862e2f3016594a134602d',
                 'typeName' => 'Google Plus',
                 'isPrimary' => false }] },
        'contactInfo' =>
          { 'familyName' => 'Lorang',
            'givenName' => 'Bart',
            'fullName' => 'Bart Lorang',
            'websites' =>
              [{ 'url' => 'https://fullcontact.com' },
               { 'url' => 'http://www.flickr.com/people/39267654@N00/' },
               { 'url' => 'http://picasaweb.google.com/lorangb' }],
            'chats' =>
              { 'gtalk' => [{ 'handle' => 'lorangb@gmail.com' }],
                'skype' => [{ 'handle' => 'bart.lorang' }] } },
        'organizations' =>
          [{ 'isPrimary' => true,
             'name' => 'FullContact',
             'startDate' => '2010-01',
             'title' => 'Co-Founder & CEO',
             'current' => true }],
        'demographics' =>
          { 'locationGeneral' => 'Boulder, Colorado',
            'locationDeduced' =>
              { 'normalizedLocation' => 'Boulder, Colorado',
                'deducedLocation' => 'Boulder, Colorado, United States',
                'city' => { 'deduced' => false, 'name' => 'Boulder' },
                'state' => { 'deduced' => false, 'name' => 'Colorado', 'code' => 'CO' },
                'country' => { 'deduced' => true, 'name' => 'United States', 'code' => 'US' },
                'continent' => { 'deduced' => true, 'name' => 'North America' },
                'county' => { 'deduced' => true, 'name' => 'Boulder', 'code' => 'Boulder' },
                'likelihood' => 1.0 },
            'age' => '33',
            'gender' => 'Male',
            'ageRange' => '25-34' },
        'socialProfiles' =>
          { 'aboutme' =>
              [{ 'typeName' => 'About.me',
                 'username' => 'lorangb',
                 'url' => 'http://about.me/lorangb' }],
            'twitter' =>
              [{ 'typeName' => 'Twitter',
                 'username' => 'bartlorang',
                 'url' => 'http://twitter.com/bartlorang' }],
            'facebook' =>
              [{ 'typeName' => 'Facebook',
                 'username' => 'bart-lorang',
                 'url' => 'http://facebook.com/bart-lorang' }],
            'linkedin' =>
              [{ 'typeName' => 'LinkedIn',
                 'username' => 'bartlorang',
                 'url' => 'http://linkedin.com/in/bartlorang' }],
            'klout' =>
              [{ 'typeName' => 'Klout',
                 'username' => 'lorangb',
                 'url' => 'http://klout.com/#/lorangb' }],
            'youtube' =>
              [{ 'typeName' => 'YouTube',
                 'username' => 'lorangb',
                 'url' => 'http://youtube.com/user/lorangb' }],
            'myspace' =>
              [{ 'typeName' => 'MySpace',
                 'userid' => '137200880',
                 'url' => 'http://myspace.com/137200880' }],
            'foursquare' =>
              [{ 'typeName' => 'FourSquare',
                 'username' => 'bartlorang',
                 'url' => 'http://foursquare.com/bartlorang' }],
            'googleprofile' =>
              [{ 'typeName' => 'Google Profile',
                 'userid' => '114426306375480734745',
                 'url' => 'http://profiles.google.com/114426306375480734745' }],
            'googleplus' =>
              [{ 'typeName' => 'Google Plus',
                 'userid' => '114426306375480734745',
                 'url' => 'http://plus.google.com/114426306375480734745' }] },
        'macromeasures' =>
          { 'interests' =>
              [{ 'name' => 'Entrepreneurship',
                 'id' => '5457c85ad4ac147c59c0ca52',
                 'score' => 0.2,
                 'parents' => ['55afc38492cffb786d83f7d0'],
                 'category' => 'default' }] } }
    end
  end

  factory :profile_report do
    user
    name { Faker::Lorem.word }

    trait :with_attachment do
      attachment { build(:emails_csv) }
    end
  end

  factory :emails_csv, class: Rack::Test::UploadedFile do
    transient do
      emails [Faker::Internet.email]
    end

    initialize_with do
      FileUtils.mkdir_p(Rails.root.join('tmp', 'test-files'))
      file = File.new(Rails.root.join('tmp', 'test-files', 'emails.csv'), 'wb')
      file.write(emails.join("\n"))
      file.close
      Rack::Test::UploadedFile.new(file.path)
    end
  end
end
