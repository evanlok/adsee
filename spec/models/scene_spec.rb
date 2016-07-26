require 'rails_helper'

RSpec.describe Scene do
  let(:scene) { build(:scene, data_attributes: [{ name: 'attr1' }, { name: 'attr2' }]) }

  describe '.with_aspect_ratio' do
    let(:scene) { create(:scene, width: 1280, height: 720) }

    it 'searches for scenes with matching width and height' do
      expect(Scene.with_aspect_ratio('16:9')).to include(scene)
    end
  end

  describe '#attribute_names' do
    it 'returns array of data attribute names' do
      expect(scene.attribute_names).to eq(%w(attr1 attr2))
    end
  end

  describe '#aspect_ratio' do
    let(:scene) { build(:scene, width: 1280, height: 720) }

    it 'retrieves aspect ratio from width and height' do
      expect(scene.aspect_ratio).to eq('16:9')
    end
  end
end
