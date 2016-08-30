require 'rails_helper'

RSpec.describe FileDownloader do
  let(:url) { Faker::Internet.url }
  subject { FileDownloader.new(url) }

  describe '#save_to_temp_file' do
    it 'downloads file' do
      stub = stub_request(:get, url).to_return(body: 'body')
      result = subject.save_to_temp_file
      expect(stub).to have_been_requested
      expect(result).to be_a(Tempfile)
    end

    context 'on error' do
      it 'raises FileDownloadError exception' do
        stub_request(:get, url).to_return(status: 404, body: 'body')
        expect { subject.save_to_temp_file }.to raise_error(FileDownloader::FileDownloadError)
      end
    end
  end
end
