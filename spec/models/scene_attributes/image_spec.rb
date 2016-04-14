require 'rails_helper'

RSpec.describe SceneAttributes::Image do
  let(:image_attr) { build(:image_attribute) }

  describe 'validations' do
    it 'validates that attachment is an Image' do
      expect(image_attr).to be_valid
    end

    context 'when attachment is not an Image' do
      let(:image_attr) { build(:image_attribute, attachment: create(:user)) }

      it 'fails validation' do
        expect(image_attr).to_not be_valid
      end
    end
  end

  describe '#value' do
    it 'returns attachment url' do
      expect(image_attr.value).to eq(image_attr.attachment.url)
    end
  end

  describe '#value=' do
    let(:image) { create(:image) }

    it 'sets attachment to an Image with matching id' do
      image_attr.value = image.id
      expect(image_attr.attachment).to eq(image)
    end
  end
end
