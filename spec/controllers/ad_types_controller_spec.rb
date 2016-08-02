require 'rails_helper'

RSpec.describe AdTypesController do
  describe 'GET index' do
    let!(:ad_type) { create(:ad_type) }

    it 'renders all ad types' do
      get :index, format: :json
      expect(response).to be_success
      expect(assigns(:ad_types)).to contain_exactly(ad_type)
    end

    context 'with industry_id param' do
      let!(:new_ad_type) { create(:ad_type) }

      it 'only returns ad types with matching industry' do
        get :index, industry_id: new_ad_type.industry_id, format: :json
        expect(response).to be_success
        expect(assigns(:ad_types)).to contain_exactly(new_ad_type)
      end
    end
  end
end
