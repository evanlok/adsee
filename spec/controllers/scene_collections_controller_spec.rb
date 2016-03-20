require 'rails_helper'

RSpec.describe SceneCollectionsController do
  login_user
  let(:scene_collection) { create(:scene_collection, user: user) }

  describe 'POST create' do
    let(:ad_type) { create(:ad_type) }

    it 'create scene collection and scene content records' do
      expect_any_instance_of(SceneCollection).to receive(:create_scene_contents_from_theme)
      post :create, scene_collection: { ad_type_id: ad_type.id }
      expect(response).to redirect_to(edit_scene_collection_url(assigns(:scene_collection)))
    end
  end

  describe 'GET edit' do
    it 'renders page' do
      get :edit, id: scene_collection.id
      expect(response).to be_success
      expect(assigns(:scene_collection)).to eq(scene_collection)
    end
  end

  describe 'PATCH update' do
    it 'updates scene collection' do
      patch :update, id: scene_collection, scene_collection: { color: '#ffffff' }
      expect(response).to redirect_to(edit_scene_collection_url(scene_collection))
    end
  end
end
