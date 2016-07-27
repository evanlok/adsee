class FacebookVideoWorker
  include Sidekiq::Worker

  sidekiq_options retry: 3

  def perform(scene_collection_id)
    scene_collection = SceneCollection.find(scene_collection_id)

    case scene_collection.integration
    when 'facebook_ad'
      facebook_ad = scene_collection.current_facebook_ad
      Facebook::VideoAdManager.new(facebook_ad).run
    when 'facebook_post'
      Facebook::FeedPoster.new(scene_collection).post_to_wall
    when 'facebook_page_post'
      Facebook::FeedPoster.new(scene_collection).post_to_page
    end
  end
end
