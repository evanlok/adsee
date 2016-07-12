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

  describe '#config_attributes' do
    let(:scene_attribute) { build(:scene_attribute, name: 'text', config: { size: 20, alignment: 'center' }) }

    it 'returns hash of config attributes prefixed with scene attribute name' do
      expect(scene_attribute.config_attributes).to eq({ text_size: 20, text_alignment: 'center' }.stringify_keys)
    end
  end
end
