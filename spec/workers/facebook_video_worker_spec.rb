require 'rails_helper'

RSpec.describe FacebookVideoWorker do
  describe '#perform' do
    context 'when integration is a facebook_ad' do
      let(:facebook_ad) { double(:facebook_ad) }
      let!(:scene_collection) { create(:scene_collection, integration: 'facebook_ad') }

      it 'posts ad to facebook' do
        expect_any_instance_of(SceneCollection).to receive(:current_facebook_ad) { facebook_ad }
        expect(Facebook::VideoAdManager).to receive(:new).with(facebook_ad) { double(:video_ad_manager, run: true) }
        FacebookVideoWorker.new.perform(scene_collection.id)
      end
    end

    context 'when integration is a facebook_post' do
      let!(:scene_collection) { create(:scene_collection, integration: 'facebook_post') }

      it 'posts video to user feed' do
        expect_any_instance_of(Facebook::FeedPoster).to receive(:post_to_wall)
        FacebookVideoWorker.new.perform(scene_collection.id)
      end
    end

    context 'when integration is a facebook_page_post' do
      let!(:scene_collection) { create(:scene_collection, integration: 'facebook_page_post') }

      it 'posts video to facebook page' do
        expect_any_instance_of(Facebook::FeedPoster).to receive(:post_to_page)
        FacebookVideoWorker.new.perform(scene_collection.id)
      end
    end
  end
end
