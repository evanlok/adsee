class ScenesImporter
  def import
    imported = 0
    last_updated_timestamp = Scene.maximum(:updated_at)

    hal_client.scenes(limit: 1000, since: last_updated_timestamp.to_i).each do |data|
      scene = Scene.where(hal_id: data['id']).first_or_initialize
      scene.name = data['name']
      scene.data_attributes = data['attributes']
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
