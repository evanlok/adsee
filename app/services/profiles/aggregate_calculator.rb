module Profiles
  class AggregateCalculator
    AGGREGATE_ATTRIBUTE_PATHS = {
      name: %w(contactInfo fullName),
      age: %w(demographics age),
      gender: %w(demographics gender),
      photo: %w(photos),
      location: %w(demographics locationDeduced normalizedLocation),
      company: %w(organizations),
      interests: %w(macromeasures interests),
      linkedin: %w(socialProfiles linkedin),
      facebook: %w(socialProfiles facebook),
      twitter: %w(socialProfiles twitter),
      pinterest: %w(socialProfiles pinterest)
    }.freeze

    attr_reader :emails, :aggregates

    def initialize(emails)
      @emails = emails
      @aggregates = Profiles::ReportAggregates.new
    end

    def run
      @aggregates.reset
      aggregates.total += emails.length

      Profile.where(email: emails).find_each do |profile|
        profile_data = profile.data
        aggregates.matched += 1

        AGGREGATE_ATTRIBUTE_PATHS.each do |attr_name, path|
          aggregates[attr_name] += 1 if profile_data.dig(*path).present?
        end

        calculate_gender(profile_data)
        calculate_age(profile_data)
        calculate_age_ranges(profile_data)
        calculate_locations(profile_data)
      end

      aggregates
    end

    def calculate_gender(profile_data)
      gender = profile_data.dig('demographics', 'gender')

      if gender == 'Male'
        aggregates.male += 1
      else
        aggregates.female += 1
      end
    end

    def calculate_age(profile_data)
      age = profile_data.dig('demographics', 'age')
      return unless age

      aggregates.ages[age] ||= 0
      aggregates.ages[age] += 1
    end

    def calculate_age_ranges(profile_data)
      age_range = profile_data.dig('demographics', 'ageRange')
      return unless age_range

      aggregates.age_ranges[age_range] ||= 0
      aggregates.age_ranges[age_range] += 1
    end

    def calculate_locations(profile_data)
      country = profile_data.dig('demographics', 'locationDeduced', 'country', 'code')
      state = profile_data.dig('demographics', 'locationDeduced', 'state', 'code')

      if country
        aggregates.countries[country] ||= 0
        aggregates.countries[country] += 1
      end

      return unless state
      aggregates.states[state] ||= 0
      aggregates.states[state] += 1
    end
  end
end
