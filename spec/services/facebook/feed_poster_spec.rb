require 'rails_helper'

RSpec.describe Facebook::FeedPoster do
  let(:scene_collection) { build(:scene_collection) }
  let(:feed_poster) { described_class.new(scene_collection) }
  let(:client) { double(:client) }
  let(:video_url) { Faker::Internet.url }

  before do
    allow(feed_poster).to receive(:video_url) { video_url }
    allow(feed_poster).to receive(:client) { client }
    allow(feed_poster).to receive(:page_client) { client }
  end

  describe '#post_to_wall' do
    let(:scene_collection) { build(:scene_collection, integration_data: { description: 'desc' }) }

    it 'sends request to post video onto user feed' do
      expected_params = {
        file_url: video_url,
        description: 'desc'
      }

      expect(client).to receive(:put_object).with('me', 'videos', expected_params)
      feed_poster.post_to_wall
    end
  end

  describe '#post_to_page' do
    let(:scene_collection) { build(:scene_collection, integration_data: { page_id: '1234', description: 'desc' }) }

    it 'sends request to post video onto user feed' do
      expected_params = {
        file_url: video_url,
        description: 'desc'
      }

      expect(client).to receive(:put_object).with('1234', 'videos', expected_params)
      feed_poster.post_to_page
    end

    context 'with call to action' do
      let(:scene_collection) do
        build(:scene_collection,
              integration_data: {
                page_id: '1234',
                description: 'desc',
                call_to_action: {
                  type: 'LEARN_MORE',
                  value: {
                    url: 'http://www.adsee.io',
                    link_caption: 'caption'
                  }
                }
              })
      end

      it 'sends request to post video onto user feed' do
        expected_params = {
          file_url: video_url,
          description: 'desc',
          call_to_action: { type: 'LEARN_MORE', value: { url: 'http://www.adsee.io', link_caption: 'caption' } }.to_json
        }

        expect(client).to receive(:put_object).with('1234', 'videos', expected_params)
        feed_poster.post_to_page
      end
    end
  end
end
