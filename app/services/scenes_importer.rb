class ScenesImporter
  def import(full = false)
    imported = 0
    last_updated_timestamp = Scene.maximum(:updated_at)
    params = { limit: 1000, since: last_updated_timestamp.to_i }
    params.delete(:since) if full

    hal_client.scenes(params).each do |data|
      scene = Scene.where(hal_id: data['id']).first_or_initialize
      scene.name = data['name']
      scene.data_attributes = data['attributes']
      scene.width = data['width']
      scene.height = data['height']
      scene.duration = data['duration']
      scene.save
      imported += 1
    end

    imported
  end

  private

  def hal_client
    HAL::Client.new
  end
end
