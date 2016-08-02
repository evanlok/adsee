require 'rails_helper'

RSpec.describe ThemesController do
  let!(:theme) { create(:theme) }

  describe 'GET index' do
    it 'renders all themes' do
      get :index, format: :json
      expect(response).to be_success
      expect(assigns(:themes)).to contain_exactly(theme)
    end

    context 'with ad_type_id filter' do
      let!(:new_theme) { create(:theme) }

      it 'only returns themes with matching ad type' do
        get :index, ad_type_id: new_theme.ad_type_id, format: :json
        expect(response).to be_success
        expect(assigns(:themes)).to contain_exactly(new_theme)
      end
    end

    context 'with featured filter' do
      let!(:featured_theme) { create(:theme, featured: true) }

      it 'only returns featured themes' do
        get :index, featured: '1', format: :json
        expect(response).to be_success
        expect(assigns(:themes)).to contain_exactly(featured_theme)
      end
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
