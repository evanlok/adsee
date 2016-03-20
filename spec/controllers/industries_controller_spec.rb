require 'rails_helper'

RSpec.describe IndustriesController do
  describe 'GET index' do
    let!(:industry) { create(:industry) }

    it 'renders page' do
      get :index
      expect(response).to be_success
      expect(assigns(:industries)).to contain_exactly(industry)
    end
  end
end
