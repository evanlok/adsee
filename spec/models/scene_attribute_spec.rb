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
end
