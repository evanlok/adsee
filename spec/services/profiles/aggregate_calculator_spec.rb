require 'rails_helper'

RSpec.describe Profiles::AggregateCalculator do
  let(:profile) { create(:profile) }

  subject { Profiles::AggregateCalculator.new([profile.email]) }

  it 'calculates aggregate counts for report' do
    subject.run
    expected_attributes = {
      total: 1,
      matched: 1,
      name: 1,
      age: 1,
      gender: 1,
      photo: 1,
      location: 1,
      company: 1,
      interests: 1,
      linkedin: 1,
      facebook: 1,
      twitter: 1,
      pinterest: 0,
      ages: { profile.data.dig('demographics', 'age') => 1 },
      age_ranges: { profile.data.dig('demographics', 'ageRange') => 1 },
      countries: {
        profile.data.dig('demographics', 'locationDeduced', 'country', 'code') => 1
      },
      states: {
        profile.data.dig('demographics', 'locationDeduced', 'state', 'code') => 1
      }
    }
    expect(subject.aggregates.as_json).to include(expected_attributes)
  end

  context 'with email that doesn\'t match' do
    subject { Profiles::AggregateCalculator.new([profile.email, Faker::Internet.email]) }

    it 'only counts emails that matched' do
      subject.run
      expect(subject.aggregates.as_json).to include(total: 2, matched: 1)
    end
  end
end
