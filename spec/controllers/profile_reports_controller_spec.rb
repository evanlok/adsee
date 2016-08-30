require 'rails_helper'

RSpec.describe ProfileReportsController do
  login_user

  describe 'POST create' do
    let(:profile_report_params) { { title: 'Title', file_path: 'path/to/emails.csv' } }

    it 'creates new profile report' do
      expect_any_instance_of(Profiles::ProfileReportBuilder).to receive(:create) { double(:result, created?: true) }
      post :create, profile_report: profile_report_params, ad_account_id: 'act_123', format: :json
      expect(response).to be_success
      expect(response).to have_http_status(:created)
    end

    context 'with invalid params' do
      let(:profile_report_params) { { title: '', file_path: 'path/to/emails.csv' } }

      it 'returns error response' do
        expect_any_instance_of(Profiles::ProfileReportBuilder)
          .to receive(:create) { double(:result, created?: false, error_messages: ['Error']) }
        post :create, profile_report: profile_report_params, ad_account_id: 'act_123', format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
