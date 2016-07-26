require 'rails_helper'

RSpec.describe Image do
  let(:host) { Faker::Internet.url }

  around do |example|
    ClimateControl.modify CDN_URL: host do
      example.run
    end
  end

  describe '#original_url' do
    subject { build(:image, original_path: 'original_path').original_url }
    it { is_expected.to eq("#{host}/original_path") }
  end

  describe '#thumbnail_url' do
    subject { build(:image, thumbnail_path: 'thumbnail_path').thumbnail_url }
    it { is_expected.to eq("#{host}/thumbnail_path") }
  end

  describe '#url' do
    subject { build(:image, path: 'path').url }
    it { is_expected.to eq("#{host}/path") }
  end
end
