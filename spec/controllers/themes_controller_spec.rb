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
end
