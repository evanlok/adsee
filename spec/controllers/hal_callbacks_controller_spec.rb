require 'rails_helper'

RSpec.describe HalCallbacksController do
  let!(:scene_collection) { create(:scene_collection) }
  let!(:video_job) { create(:video_job, scene_collection: scene_collection, hal_id: '1234') }
  let(:params) do
    {
      id: 1234,
      thumbnail_url: Faker::Internet.url,
      duration: 100,
      videos: [
        { url: Faker::Internet.url, width: 640, height: 360 },
        { url: Faker::Internet.url, width: 1280, height: 720 }
      ]
    }
  end

  describe 'POST create' do
    it 'creates videos from request' do
      post :create, params
      expect(response).to be_success
      expect(Video.where(scene_collection_id: scene_collection).count).to eq(2)
      expect(Video.find_by(resolution: 360)).to have_attributes(duration: params[:duration],
                                                                thumbnail_url: params[:thumbnail_url],
                                                                url: params[:videos][0][:url])

      expect(Video.find_by(resolution: 720)).to have_attributes(duration: params[:duration],
                                                                thumbnail_url: params[:thumbnail_url],
                                                                url: params[:videos][1][:url])
    end

    context 'when more recent video job exists' do
      let!(:newer_video_job) { create(:video_job, scene_collection: scene_collection, hal_id: '5000') }

      it 'ignores request' do
        post :create, params, format: :json
        expect(response).to be_success
        expect(Video.count).to eq(0)
      end
    end
  end
end
