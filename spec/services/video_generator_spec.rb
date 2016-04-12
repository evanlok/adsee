require 'rails_helper'

RSpec.describe VideoGenerator do
  let(:font) { create(:font) }
  let(:song) { create(:song) }
  let(:scene_collection) { create(:scene_collection, font: font, song: song) }
  let(:scene) { create(:scene, data_attributes: [{ name: 'city', type: 'text' }, { name: 'count', type: 'number' }]) }
  let!(:scene_content) { create(:scene_content, scene_collection: scene_collection, scene: scene) }
  let!(:scene_attribute_text) { create(:text_attribute, scene_content: scene_content, name: 'city') }
  let!(:scene_attribute_number) { create(:number_attribute, scene_content: scene_content, name: 'count') }
  subject { VideoGenerator.new(scene_collection) }

  around do |example|
    ClimateControl.modify HOST: 'www.adsee.com', WEB_PORT: '443', URI_SCHEME: 'https' do
      example.run
    end
  end

  describe '#run' do
    it 'sends request to HAL client' do
      params = {
        font: scene_collection.font.url,
        music: scene_collection.song.url,
        background_color: scene_collection.color,
        callback_url: 'https://www.adsee.com/hal_callback',
        scenes: [
          {
            scene_id: scene.hal_id,
            transition: scene_content.transition.value,
            transition_duration: scene_content.transition_duration,
            data: {
              city: scene_attribute_text.value,
              count: scene_attribute_number.value
            }.stringify_keys
          }
        ]
      }

      expect_any_instance_of(HAL::Client).to receive(:create_scene_collection).with(params)
      expect(subject).to receive(:process_response)
      subject.run
    end

    it 'handles response from HAL' do
      expect(scene_collection).to receive(:valid_scene_contents?) { true }
      expect_any_instance_of(HAL::Client).to receive(:create_scene_collection) { { id: 1234 }.stringify_keys }
      subject.run
      expect(VideoJob.where(hal_id: '1234', scene_collection_id: scene_collection.id)).to exist
    end
  end
end
