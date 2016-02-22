require 'rails_helper'

RSpec.describe SceneAttributes::Boolean do
  let(:boolean_attr) { build(:boolean_attribute, value: 'true') }

  describe '#value' do
    it 'parses boolean from string' do
      expect(boolean_attr.value).to be true
      boolean_attr.value = 'false'
      expect(boolean_attr.value).to be false
    end

    context 'with unparseable value' do
      let(:boolean_attr) { build(:boolean_attribute, value: 'invalid') }

      it 'raises error' do
        expect { boolean_attr.value }.to raise_error(SceneAttribute::ParseError)
      end
    end
  end
end
