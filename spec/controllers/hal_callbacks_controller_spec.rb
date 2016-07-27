require 'rails_helper'

RSpec.describe HalCallbacksController do
  let!(:scene_collection) { create(:scene_collection, hal_id: '1234') }
  let!(:video_job) { create(:video_job, scene_collection: scene_collection) }
  let(:params) do
    {
      video_job_id: video_job.id,
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
    it 'creates videos from request and posts ad to facebook' do
      post :create, params
      expect(response).to be_success
      expect(Video.where(scene_collection_id: scene_collection).count).to eq(2)

      expect(Video.find_by(height: 360)).to have_attributes(duration: params[:duration],
                                                            thumbnail_url: params[:thumbnail_url],
                                                            url: params[:videos][0][:url],
                                                            width: 640,
                                                            height: 360)

      expect(Video.find_by(height: 720)).to have_attributes(duration: params[:duration],
                                                            thumbnail_url: params[:thumbnail_url],
                                                            url: params[:videos][1][:url],
                                                            width: 1280,
                                                            height: 720)
      expect(scene_collection.reload.status).to eq('generated')
      expect(FacebookVideoWorker).to have_enqueued_sidekiq_job(scene_collection.id)
    end

    context 'when more recent video job exists' do
      let!(:newer_video_job) { create(:video_job, scene_collection: scene_collection) }

      it 'ignores request' do
        post :create, params, format: :json
        expect(response).to be_success
        expect(Video.count).to eq(0)
      end
    end
  end

  describe 'POST stream' do
    it 'updates video job stream url' do
      post :stream, video_job_id: video_job.id, stream_url: 'stream'
      expect(response).to be_success
      expect(assigns(:video_job).stream_url).to eq('stream')
    end
  end

  describe 'POST preview' do
    it 'updates video job stream url' do
      post :preview, video_job_id: video_job.id, stream_url: 'stream'
      expect(response).to be_success
      expect(assigns(:video_job).stream_url).to eq('stream')
    end
  end
end
