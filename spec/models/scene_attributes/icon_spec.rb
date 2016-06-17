require 'rails_helper'

RSpec.describe SceneAttributes::Icon do
  let(:icon_attr) { build(:icon_attribute) }

  describe 'validations' do
    it 'validates that attachment is an Icon' do
      expect(icon_attr).to be_valid
    end

    context 'when attachment is not an Icon' do
      let(:icon_attr) { build(:icon_attribute, attachment: create(:user)) }

      it 'fails validation' do
        expect(icon_attr).to_not be_valid
      end
    end
  end

  describe '#value' do
    it 'returns attachment url' do
      expect(icon_attr.value).to eq(icon_attr.attachment.url)
    end
  end

  describe '#value=' do
    let(:icon) { create(:icon) }

    it 'sets attachment to an Icon with matching id' do
      icon_attr.value = icon.id
      expect(icon_attr.attachment).to eq(icon)
    end
  end
end
