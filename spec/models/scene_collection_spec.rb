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
      let(:theme) { create(:theme) }
      let!(:theme_variant) { create(:theme_variant, theme: theme) }
      let!(:scene) { create(:scene, theme_variants: [theme_variant]) }
      let(:scene_collection) { create(:scene_collection, theme: theme) }

      it 'creates scene content records from theme scenes' do
        scene_collection.create_scene_contents_from_theme
        expect(scene_collection.scene_contents).to_not be_empty
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
end
