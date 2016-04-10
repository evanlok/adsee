Rails.application.routes.draw do
  devise_for :users

  root 'industries#index'

  resources :industries, only: [:index] do
    resources :ad_types, only: [:index]
  end

  resources :ad_types, only: [] do
    resources :themes, only: [:index, :show], shallow: true
  end

  resources :scene_collections, only: [:show, :create, :edit, :update], shallow: true do
    resources :scene_contents, except: [:new, :edit] do
      resources :scene_attributes, only: [:create, :update]
    end
  end

  namespace :admin do
    root 'scenes#index'

    resources :scenes, only: [:index, :edit, :update, :destroy] do
      get :tags, on: :collection
    end
    resources :songs
    resources :fonts
    resources :themes
    resources :theme_variants
    resources :industries
    resources :ad_types
    resources :video_types
    resources :transitions
  end
end
