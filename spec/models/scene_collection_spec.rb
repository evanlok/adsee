require 'rails_helper'

RSpec.describe SceneCollection do
  describe '#valid_scene_contents?' do
    let(:scene_collection) { build(:scene_collection) }
    subject { scene_collection.valid_scene_contents? }
    before { allow(scene_collection).to receive(:scene_contents) { double(:scope, includes: scene_contents) } }

    context 'when scene contents are all valid and have valid attributes' do
      let(:scene_contents) { [instance_double('SceneContent', valid?: true, valid_attributes?: true)] }
      it { is_expected.to be true }
    end

    context 'when any scene content is invalid' do
      let(:scene_contents) { [instance_double('SceneContent', valid?: false, valid_attributes?: true)] }
      it { is_expected.to be false }
    end

    context 'when any scene content has invalid attributes' do
      let(:scene_contents) { [instance_double('SceneContent', valid?: true, valid_attributes?: false)] }
      it { is_expected.to be false }
    end
  end

  describe '#create_scene_contents_from_theme' do
    context 'when theme is present' do
      let(:theme) { create(:theme, :with_song_and_font) }
      let(:transition) { create(:transition) }
      let!(:theme_variant) { create(:theme_variant, theme: theme) }
      let!(:theme_variant_scene) { create(:theme_variant_scene, theme_variant: theme_variant, transition: transition) }
      let(:scene_collection) { create(:scene_collection, theme: theme) }

      it 'creates scene content records from theme scenes' do
        scene_collection.create_scene_contents_from_theme
        expect(scene_collection.scene_contents).to_not be_empty
      end

      it 'sets transition on scene content record' do
        scene_collection.create_scene_contents_from_theme
        expect(scene_collection.scene_contents.first.transition).to eq(transition)
      end

      it 'sets font, song, and aspect_ratio from theme' do
        scene_collection.create_scene_contents_from_theme
        expect(scene_collection.song).to eq(theme.song)
        expect(scene_collection.font).to eq(theme.font)
        expect(scene_collection.aspect_ratio).to eq(theme_variant.aspect_ratio)
      end
    end

    context 'when there is no theme' do
      let(:scene_collection) { create(:scene_collection) }

      it 'does nothing' do
        expect(scene_collection.create_scene_contents_from_theme).to be_nil
        expect(scene_collection.scene_contents).to be_empty
      end
    end
  end

  describe '#video' do
    let(:scene_collection) { create(:scene_collection) }
    let!(:video_low) { create(:video, scene_collection: scene_collection, height: 360) }
    let!(:video) { create(:video, scene_collection: scene_collection, height: 720) }

    it 'returns the highest resolution video' do
      expect(scene_collection.video).to eq(video)
    end
  end

  describe '#current_facebook_ad' do
    let(:scene_collection) { create(:scene_collection) }

    context 'when facebook ad exists' do
      let!(:facebook_ad) { create(:facebook_ad, scene_collection: scene_collection) }

      it 'returns facebook ad' do
        expect(scene_collection.current_facebook_ad).to eq(facebook_ad)
      end
    end

    context 'when facebook ad does not exist' do
      it 'creates new facebook ad' do
        expect(scene_collection.facebook_ads).to be_empty
        expect(scene_collection.current_facebook_ad).to be_a(FacebookAd)
      end
    end
  end
end
