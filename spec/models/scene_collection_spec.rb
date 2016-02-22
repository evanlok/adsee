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
end
