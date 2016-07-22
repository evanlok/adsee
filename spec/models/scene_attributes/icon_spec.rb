require 'rails_helper'

RSpec.describe SceneAttributes::Icon do
  let(:icon_attr) { build(:icon_attribute) }

  describe 'validations' do
    it 'validates that attachment is an Icon' do
      expect(icon_attr).to be_valid
    end

    context 'when attach is an image' do
      let(:image) { build(:image) }
      let(:icon_attr) { build(:icon_attribute, attachment: image) }

      it 'validates that attachment is an Image' do
        expect(icon_attr).to be_valid
      end
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

  describe '#image_id=' do
    let(:image) { create(:image) }

    it 'sets attachment to an Image with matching id' do
      icon_attr.image_id = image.id
      expect(icon_attr.attachment).to eq(image)
    end
  end

  describe '#attachment_name' do
    let(:icon_attr) { build(:icon_attribute, attachment: attachment) }

    context 'for icon' do
      let(:attachment) { create(:icon) }

      it 'returns name from icon attachment' do
        expect(icon_attr.attachment_name).to eq(attachment.name)
      end
    end

    context 'for image' do
      let(:attachment) { create(:image) }

      it 'returns filename from attachment' do
        expect(icon_attr.attachment_name).to eq(attachment.filename)
      end
    end
  end
end
