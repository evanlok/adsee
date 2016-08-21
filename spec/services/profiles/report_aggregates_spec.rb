require 'rails_helper'

RSpec.describe Profiles::ReportAggregates do
  subject { Profiles::ReportAggregates.new }

  describe '#reset' do
    it 'sets all attributes to default values' do
      Profiles::ReportAggregates::NUMBER_ATTRIBUTE_NAMES.each do |name|
        expect(subject.send(name)).to eq(0)
      end

      Profiles::ReportAggregates::JSON_ATTRIBUTE_NAMES.each do |name|
        expect(subject.send(name)).to eq({})
      end
    end
  end

  describe '#[]' do
    it 'returns attribute value' do
      expect(subject[:age]).to eq(0)
    end
  end

  describe '#[]=' do
    it 'sets attribute value' do
      subject[:age] = 4
      expect(subject.age).to eq(4)
    end
  end

  describe '#merge!' do
    it 'merges values from another ReportAggregate instance' do
      subject.name = 5
      subject.states = { CA: 1 }
      report_aggregate = Profiles::ReportAggregates.new
      report_aggregate.name = 3
      report_aggregate.states = { CA: 2, NY: 3 }
      subject.merge!(report_aggregate)
      expect(subject.name).to eq(8)
      expect(subject.states).to eq(CA: 3, NY: 3)
    end
  end

  describe '#as_json' do
    it 'returns attributes as a hash' do
      subject.name = 5
      subject.male = 8
      expect(subject.as_json).to include(name: 5, male: 8)
    end

    it 'clones json attributes' do
      subject.states = { CA: 1 }
      expect(subject.as_json[:states]).to eq(subject.states)
      expect(subject.as_json[:states]).to_not equal(subject.states)
    end
  end
end
