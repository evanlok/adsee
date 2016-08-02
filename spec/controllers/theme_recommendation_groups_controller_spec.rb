require 'rails_helper'

RSpec.describe ThemeRecommendationGroupsController do
  describe 'GET index' do
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
      get :index, ad_type_id: ad_type.id, facebook_targeting_spec_id: targeting_spec.id, format: :json
      expect(response).to be_success
      expect(assigns(:theme_recommendation_groups)).to contain_exactly(theme_recommendation_group)
      expect(assigns(:theme_recommendation_groups).first.themes).to contain_exactly(theme)
    end

    context 'with invalid parameters' do
      it 'returns not found error' do
        get :index, ad_type_id: ad_type.id, facebook_targeting_spec_id: nil, format: :json
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
