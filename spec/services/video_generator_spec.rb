require 'rails_helper'

RSpec.describe VideoGenerator do
  let(:font) { create(:font) }
  let(:song) { create(:song) }
  let(:scene_collection) { create(:scene_collection, font: font, song: song) }
  let(:scene) { create(:scene, data_attributes: [{ name: 'city', type: 'text' }, { name: 'count', type: 'number' }]) }
  let!(:scene_content) { create(:scene_content, scene_collection: scene_collection, scene: scene) }
  let(:config) { { size: 20, alignment: 'center' } }
  let!(:scene_attribute_text) { create(:text_attribute, scene_content: scene_content, name: 'city', config: config) }
  let!(:scene_attribute_number) { create(:number_attribute, scene_content: scene_content, name: 'count') }
  subject { VideoGenerator.new(scene_collection) }

  around do |example|
    ClimateControl.modify HOST: 'www.adsee.com', WEB_PORT: '443', URI_SCHEME: 'https' do
      example.run
    end
  end

  describe '#create_or_update_scene_collection' do
    it 'sends request to HAL client' do
      params = {
        font: scene_collection.font.url,
        music: scene_collection.song.url,
        user_audio: scene_collection.audio_url,
        color: scene_collection.color,
        scenes: [
          {
            scene_id: scene.hal_id,
            transition: scene_content.transition.value,
            transition_duration: scene_content.transition_duration,
            data: {
              city: scene_attribute_text.value,
              city_size: 20,
              city_alignment: 'center',
              count: scene_attribute_number.value
            }.stringify_keys
          }
        ]
      }

      expect_any_instance_of(HAL::Client)
        .to receive(:create_scene_collection).with(params) { { id: '100' }.stringify_keys }
      subject.create_or_update_scene_collection
      expect(scene_collection.hal_id).to eq('100')
    end

    context 'when scene collection already exists on HAL' do
      let(:scene_collection) { create(:scene_collection, font: font, song: song, hal_id: '1234') }

      it 'updates existing record' do
        expect_any_instance_of(HAL::Client).to receive(:update_scene_collection).with('1234', kind_of(Hash))
        subject.create_or_update_scene_collection
      end
    end
  end

  describe '#preview' do
    let(:scene_collection) { build(:scene_collection, hal_id: '555') }

    it 'creates VideoJob and sends preview request' do
      allow(subject).to receive(:create_or_update_scene_collection)
      expect_any_instance_of(HAL::Client)
        .to receive(:preview_scene_collection)
              .with(scene_collection.hal_id, hash_including(:callback_url))
      expect(subject.preview).to be_a(VideoJob)
    end
  end

  describe '#generate' do
    let(:scene_collection) { build(:scene_collection, hal_id: '555') }

    it 'creates VideoJob and sends generate request' do
      allow(subject).to receive(:create_or_update_scene_collection)
      expect_any_instance_of(HAL::Client)
        .to receive(:generate_scene_collection)
              .with(scene_collection.hal_id, hash_including(:callback_url, :stream_callback_url))
      expect(subject.generate).to be_a(VideoJob)
      expect(scene_collection.status).to eq('generating')
    end
  end
end
