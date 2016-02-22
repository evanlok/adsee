require 'rails_helper'

RSpec.describe SceneContent do
  describe '#valid_attributes?' do
    let(:scene) { build(:scene, data_attributes: [{ name: 'attr1', type: 'text' }, { name: 'attr2', type: 'number' }]) }
    subject { scene_content.valid_attributes? }

    context 'when all attributes are valid' do
      let(:text_attr) { build(:text_attribute, name: 'attr1') }
      let(:number_attr) { build(:number_attribute, name: 'attr2') }
      let(:scene_content) { build(:scene_content, scene: scene, scene_attributes: [text_attr, number_attr]) }
      it { is_expected.to be true }
    end

    context 'when any attribute is invalid' do
      let(:text_attr) { build(:number_attribute, name: 'attr1') }
      let(:number_attr) { build(:number_attribute, name: 'attr2', value: nil) }
        let(:scene_content) { build(:scene_content, scene: scene, scene_attributes: [text_attr, number_attr]) }
      it { is_expected.to be false }
    end

    context 'when any attribute is missing' do
      let(:text_attr) { build(:text_attribute, name: 'attr1') }
      let(:scene_content) { build(:scene_content, scene: scene, scene_attributes: [text_attr]) }
      it { is_expected.to be false }
    end

    context 'when the attribute type does not match' do
      let(:text_attr) { build(:text_attribute, name: 'attr1') }
      let(:boolean_attr) { build(:boolean_attribute, name: 'attr2') }
      let(:scene_content) { build(:scene_content, scene: scene, scene_attributes: [text_attr, boolean_attr]) }
      it { is_expected.to be false }
    end
  end
end
