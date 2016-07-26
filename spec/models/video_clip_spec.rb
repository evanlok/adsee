require 'rails_helper'

RSpec.describe VideoClip, type: :model do
  let(:host) { Faker::Internet.url }

  around do |example|
    ClimateControl.modify CDN_URL: host do
      example.run
    end
  end

  describe '#base_dir' do
    let(:video_clip) { create(:video_clip) }
    subject { video_clip.base_dir }

    it { is_expected.to eq("video_clips/#{video_clip.id}") }
  end

  describe '#original_url' do
    subject { build(:video_clip, original_path: 'original_path').original_url }
    it { is_expected.to eq("#{host}/original_path") }

    context 'when original_path is nil' do
      subject { build(:video_clip, original_path: nil).original_url }
      it { is_expected.to be nil }
    end
  end

  describe '#url' do
    subject { build(:video_clip, path: 'path').url }
    it { is_expected.to eq("#{host}/path") }

    context 'when path is nil' do
      subject { build(:video_clip, path: nil).url }
      it { is_expected.to be nil }
    end
  end
end
