require 'rails_helper'

RSpec.describe ScenesImporter do
  describe '#import' do
    let(:hal_client) { instance_spy('HAL::Client', scenes: scenes_json) }
    let(:scenes_json) do
      [
        {
          id: 100,
          name: 'Scene 1',
          attributes: [
            { name: 'city' }
          ],
          width: 1280,
          height: 720
        }
      ].map(&:deep_stringify_keys)
    end

    before do
      allow(subject).to receive(:hal_client) { hal_client }
    end

    it 'fetches scenes from HAL' do
      subject.import
      expect(hal_client).to have_received(:scenes)
    end

    it 'returns number of scenes imported' do
      expect(subject.import).to eq(1)
    end

    it 'imports scenes from json' do
      subject.import
      expect(Scene.count).to eq(1)
    end

    context 'with existing scenes' do
      let!(:scene) { create(:scene) }

      it 'sends most recent updated_at timestamp in request' do
        subject.import
        expect(hal_client).to have_received(:scenes).with(hash_including(since: scene.updated_at.to_i))
      end
    end
  end
end
