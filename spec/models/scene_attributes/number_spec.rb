require 'rails_helper'

RSpec.describe SceneAttributes::Number do
  describe '#value' do
    let(:number_attr) { build(:number_attribute, value: '100') }

    it 'parses integers' do
      expect(number_attr.value).to eq(100)
    end

    it 'parses floats' do
      number_attr.value = '10.24'
      expect(number_attr.value).to eq(10.24)
      number_attr.value = '.15'
      expect(number_attr.value).to eq(0.15)
    end

    context 'with invalid number' do
      let(:number_attr) { build(:number_attribute, value: '100.10.50') }

      it 'raises error' do
        expect { number_attr.value }.to raise_error(SceneAttribute::ParseError)
      end
    end
  end
end
