class VideoGenerator
  delegate :url_helpers, to: 'Rails.application.routes'
  attr_reader :scene_collection

  def initialize(scene_collection)
    @scene_collection = scene_collection
  end

  def create_or_update_scene_collection
    if scene_collection.hal_id
      response = client.update_scene_collection(scene_collection.hal_id, scene_collection_params)
    else
      response = client.create_scene_collection(scene_collection_params)
      scene_collection.update(hal_id: response['id'])
    end

    response
  end

  def preview
    create_or_update_scene_collection
    video_job = VideoJob.create(scene_collection: scene_collection, preview: true)

    params = {
      callback_url: url_helpers.preview_callback_url(video_job, default_url_options)
    }

    client.preview_scene_collection(scene_collection.hal_id, params)
    video_job
  end

  def generate
    create_or_update_scene_collection
    video_job = VideoJob.create(scene_collection: scene_collection, preview: false)

    params = {
      callback_url: url_helpers.video_callback_url(video_job, default_url_options),
      stream_callback_url: url_helpers.preview_callback_url(video_job, default_url_options)
    }

    client.generate_scene_collection(scene_collection.hal_id, params)
    scene_collection.generating!
    video_job
  end

  private

  def scene_collection_params
    {
      font: scene_collection.font&.url,
      music: scene_collection.song&.url,
      color: scene_collection.color,
      scenes: generate_scenes_params
    }
  end

  def generate_scenes_params
    scene_collection.scene_contents.includes(:scene, :scene_attributes).map do |scene_content|
      scene_params = {
        scene_id: scene_content.scene.hal_id,
        transition: scene_content.transition&.value,
        transition_duration: scene_content.transition_duration
      }

      scene_params[:data] = scene_content.scene_attributes.each_with_object({}) do |scene_attribute, data|
        data[scene_attribute.name] = scene_attribute.value
      end

      scene_params
    end
  end

  def client
    @client ||= HAL::Client.new
  end

  def default_url_options
    { host: ENV['HOST'], port: ENV['WEB_PORT'], protocol: ENV['URI_SCHEME'] }
  end
end
