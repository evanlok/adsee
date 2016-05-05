require 'rails_helper'

RSpec.describe Facebook::VideoStatusPoller do
  let(:poller) { described_class.new(1234, 'token') }
  let(:client) { double(:client) }

  before do
    allow(poller).to receive(:client) { client }
  end

  describe '#wait_for_video' do
    let(:response) { double(:response, body: { status: { video_status: 'ready' } }.deep_stringify_keys) }

    it 'fetches video status' do
      with = [
        "/#{ENV['FACEBOOK_API_VERSION']}/1234",
        { fields: kind_of(String), access_token: 'token' }
      ]

      expect(client).to receive(:get).with(*with) { response }
      expect(poller.wait_for_video).to include({ status: { video_status: 'ready' } }.deep_stringify_keys)
    end

    context 'when video is not ready' do
      let(:encoding_response) { double(:response, body: { status: { video_status: 'encoding' } }.deep_stringify_keys) }

      before do
        expect(client).to receive(:get).twice.and_return(encoding_response, response)
      end

      it 'sleeps and retries' do
        expect(poller).to receive(:sleep).once
        poller.wait_for_video
      end
    end

    context 'when timeout is exceeded' do
      let(:response) { double(:response, body: { status: { video_status: 'encoding' } }.deep_stringify_keys) }

      it 'raises exception' do
        allow(client).to receive(:get) { response }
        allow(poller).to receive(:sleep)
        expect { poller.wait_for_video }.to raise_error(Facebook::VideoStatusPoller::VideoEncodeTimeoutError)
      end
    end
  end
end
