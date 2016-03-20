require 'rails_helper'

RSpec.describe AdTypesController do
  describe 'GET index' do
    let(:ad_type) { create(:ad_type) }

    it 'renders page' do
      get :index, industry_id: ad_type.industry.id
      expect(response).to be_success
      expect(assigns(:industry)).to eq(ad_type.industry)
      expect(assigns(:ad_types)).to contain_exactly(ad_type)
    end
  end
end
