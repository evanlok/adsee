require 'rails_helper' do
  describe '#value' do
    let(:text_attr) { build(:text_attr) }

    it 'returns raw value' do
      expect(text_attr.value).to eq(text_attr.value)
    end
  end
end
