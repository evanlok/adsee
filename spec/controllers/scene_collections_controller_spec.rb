require 'rails_helper'

RSpec.describe SceneCollectionsController do
  login_user
  let(:scene_collection) { create(:scene_collection, user: user) }

  describe 'POST create' do
    let(:ad_type) { create(:ad_type) }

    it 'create scene collection and scene content records' do
      expect_any_instance_of(SceneCollection).to receive(:create_scene_contents_from_theme_variant)
      post :create, scene_collection: { ad_type_id: ad_type.id }
      expect(response).to redirect_to(targeting_scene_collection_url(assigns(:scene_collection)))
    end

    context 'with theme_variant_id' do
      let(:theme_variant) { create(:theme_variant) }

      it 'creates scene collection from theme variant' do
        post :create, scene_collection: { theme_variant_id: theme_variant.id }, format: :json
        expect(response).to be_success
        expect(SceneCollection.last.theme_variant).to eq(theme_variant)
      end
    end
  end

  describe 'PATCH update' do
    it 'updates scene collection' do
      patch :update, id: scene_collection, scene_collection: { color: '#ffffff' }, format: :json
      expect(response).to be_success
    end

    context 'when theme_variant_id changes' do
      let(:theme_variant) { create(:theme_variant) }

      it 'calls scene_collection#create_scene_contents_from_theme_variant' do
        expect_any_instance_of(SceneCollection).to receive(:create_scene_contents_from_theme_variant)
        patch :update, id: scene_collection, scene_collection: { theme_variant_id: theme_variant.id }, format: :json
        expect(response).to be_success
      end
    end
  end
end
