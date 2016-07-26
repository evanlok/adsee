require 'rails_helper'

RSpec.describe SceneAttribute do
  describe '.from_type' do
    it 'maps type string to attribute class' do
      expect(SceneAttribute.from_type('text')).to eq(SceneAttributes::Text)
    end

    context 'for unknown types' do
      it 'raises error' do
        expect { SceneAttribute.from_type('unknown') }.to raise_error(SceneAttribute::UnknownAttributeTypeError)
      end
    end
  end

  describe '.policy_class' do
    it 'uses SceneAttributePolicy' do
      expect(SceneAttribute.policy_class).to eq(SceneAttributePolicy)
    end
  end

  describe '#config_attributes' do
    let(:scene_attribute) { build(:scene_attribute, name: 'text', config: { size: 20, alignment: 'center' }) }

    it 'returns hash of config attributes prefixed with scene attribute name' do
      expect(scene_attribute.config_attributes).to eq({ text_size: 20, text_alignment: 'center' }.stringify_keys)
    end
  end

  describe '#validatable?' do
    subject { build(:scene_attribute).validatable? }
    it { is_expected.to be true }
  end

  describe '#mapped_type' do
    let(:scene_attribute) { build(:text_attribute) }

    it 'returns string type from a class name' do
      expect(scene_attribute.mapped_type).to eq('text')
    end
  end

  describe '#config_attributes' do
    let(:scene_attribute) { build(:scene_attribute, name: 'attr1', config: { subattr: 1234 }) }

    it 'prefixes config keys with attribute name' do
      expect(scene_attribute.config_attributes).to include('attr1_subattr')
    end

    context 'when config is nil' do
      let(:scene_attribute) { build(:scene_attribute, config: nil) }

      it 'returns empty hash' do
        expect(scene_attribute.config_attributes).to eq({})
      end
    end
  end
end
