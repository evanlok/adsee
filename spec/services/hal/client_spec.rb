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
end
