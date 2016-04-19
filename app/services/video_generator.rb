class VideoGenerator
  attr_reader :scene_collection

  def initialize(scene_collection)
    @scene_collection = scene_collection
  end

  def run
    return unless scene_collection.valid_scene_contents?

    params = {
      font: scene_collection.font&.url,
      music: scene_collection.song&.url,
      color: scene_collection.color,
      callback_url: callback_url,
      scenes: generate_scenes_params
    }

    response = client.create_scene_collection(params)
    process_response(response)
    true
  end

  private

  def process_response(response)
    VideoJob.create(scene_collection: scene_collection, hal_id: response['id'])
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

  def host
    klass = ENV['URI_SCHEME'] == 'https' ? URI::HTTPS : URI::HTTP
    klass.build(host: ENV['HOST'], port: ENV['WEB_PORT'].to_i).to_s
  end

  def callback_url
    "#{host}/hal_callback"
  end
end
