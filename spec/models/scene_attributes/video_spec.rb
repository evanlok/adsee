require 'rails_helper'

RSpec.describe SceneAttributes::Video do
  let(:video_attr) { build(:video_attribute) }

  describe 'validations' do
    it 'validates that attachment is a VideoClip' do
      expect(video_attr).to be_valid
    end

    context 'when attachment is not a VideoClip' do
      let(:video_attr) { build(:video_attribute, attachment: create(:user)) }

      it 'fails validation' do
        expect(video_attr).to_not be_valid
      end
    end
  end

  describe '#value' do
    it 'returns attachment url' do
      expect(video_attr.value).to eq(URI.encode(video_attr.attachment.url))
    end
  end

  describe '#value=' do
    let(:video_clip) { create(:video_clip) }

    it 'sets attachment to a VideoClip with matching id' do
      video_attr.value = video_clip.id
      expect(video_attr.attachment).to eq(video_clip)
    end
  end
end
