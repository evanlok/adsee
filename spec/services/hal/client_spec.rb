require 'rails_helper'

RSpec.describe HAL::Client do
  around do |example|
    ClimateControl.modify HAL_URL: 'http://www.hal.com' do
      example.run
    end
  end

  describe '#scenes' do
    it 'requests GET to scenes API' do
      stub = stub_request(:get, 'http://www.hal.com/api/v1/scenes')
      subject.scenes
      expect(stub).to have_been_requested
    end
  end

  describe '#create_scene_collection' do
    it 'requests POST to scene collections API' do
      params = { data: 123 }
      stub = stub_request(:post, 'http://www.hal.com/api/v1/scene_collections').with(body: params.to_json)
      subject.create_scene_collection(params)
      expect(stub).to have_been_requested
    end
  end
end
