require 'rails_helper'

RSpec.describe ThemesController do
  let!(:theme) { create(:theme) }

  describe 'GET index' do
    it 'renders page' do
      get :index, ad_type_id: theme.ad_type.id
      expect(response).to be_success
      expect(assigns(:ad_type)).to eq(theme.ad_type)
      expect(assigns(:themes)).to contain_exactly(theme)
    end
  end

  describe 'GET show' do
    let!(:theme_variant) { create(:theme_variant, theme: theme) }

    it 'renders page' do
      get :show, id: theme.id
      expect(response).to be_success
      expect(assigns(:theme)).to eq(theme)
      expect(assigns(:theme_variant)).to be_present
    end
  end

  describe 'GET recommended' do
    let(:ad_type) { create(:ad_type) }
    let(:theme) { create(:theme, ad_type: ad_type) }
    let(:targeting_spec) { create(:facebook_targeting_spec) }
    let(:theme_recommendation_group) do
      create(:theme_recommendation_group, ad_type: ad_type, facebook_targeting_spec: targeting_spec)
    end

    let!(:theme_recommendation) do
      create(:theme_recommendation, theme_recommendation_group: theme_recommendation_group, theme: theme)
    end

    it 'returns recommended themes based on ad type and targeting spec' do
      get :recommended, ad_type_id: ad_type.id, facebook_targeting_spec_id: targeting_spec.id, format: :json
      expect(response).to be_success
      expect(assigns(:themes)).to contain_exactly(theme)
    end

    context 'with invalid parameters' do
      it 'returns not found error' do
        get :recommended, ad_type_id: ad_type.id, facebook_targeting_spec_id: nil, format: :json
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
