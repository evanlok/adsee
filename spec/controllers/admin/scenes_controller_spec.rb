require 'rails_helper'

RSpec.describe Admin::ScenesController do
  login_admin
  let(:scene) { create(:scene) }

  describe 'GET index' do
    it 'renders page' do
      get :index
      expect(response).to be_success
    end
  end

  describe 'GET edit' do
    it 'renders page' do
      get :edit, id: scene.id
      expect(response).to be_success
    end
  end

  describe 'PATCH update' do
    it 'updates scene' do
      patch :update, id: scene.id, scene: { name: 'test' }
      expect(response).to redirect_to(edit_admin_scene_url(scene))
      expect(scene.reload.name).to eq('test')
    end

    context 'with tags' do
      it 'assigns tags to scene' do
        patch :update, id: scene.id, scene: { tags: ['tag'] }
        expect(response).to redirect_to(edit_admin_scene_url(scene))
        expect(scene.reload.tag_list).to eq(['tag'])
      end
    end

    context 'with invalid params' do
      it 'renders edit' do
        patch :update, id: scene.id, scene: { name: '' }
        expect(response).to render_template(:edit)
      end
    end
  end

  describe 'DELETE destroy' do
    it 'deletes scene record' do
      delete :destroy, id: scene.id
      expect(response).to redirect_to(admin_scenes_url)
      expect(Scene.where(id: scene).exists?).to be false
    end
  end

  describe 'GET tags' do
    before do
      scene.update(tag_list: 'agent')
    end

    it 'searches for scene tags' do
      get :tags, q: 'ag', format: :json
      expect(assigns(:tags).pluck(:name)).to include('agent')
      expect(response).to be_success
    end
  end
end
