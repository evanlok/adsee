Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  root 'scene_collections#new'

  resources :industries, only: [:index] do
    resources :ad_types, only: [:index]
  end

  resources :ad_types, only: [] do
    resources :themes, only: [:index, :show], shallow: true
  end

  resources :scene_collections, only: [:show, :new, :create, :update], shallow: true do
    resources :scene_contents, except: [:new, :edit] do
      resources :scene_attributes, only: [:create, :update]
    end

    resources :video_jobs, only: [:show] do
      collection do
        post :preview
        post :generate
      end
    end

    resources :facebook_ads, only: [:show, :create, :update]
  end

  resources :scenes, only: [:index]
  resources :images, only: [:index, :create, :destroy]
  resources :video_clips, only: [:index, :create, :destroy]
  resources :facebook_targeting_specs, only: [:index]

  post '/hal_callbacks/:video_job_id', to: 'hal_callbacks#create', as: :video_callback
  post '/hal_callbacks/:video_job_id/stream', to: 'hal_callbacks#stream', as: :stream_callback
  post '/hal_callbacks/:video_job_id/preview', to: 'hal_callbacks#preview', as: :preview_callback

  namespace :admin do
    root 'scenes#index'

    resources :scenes, only: [:index, :edit, :update, :destroy] do
      get :tags, on: :collection
      post :import, on: :collection
    end

    resources :scene_categories
    resources :songs
    resources :fonts
    resources :themes
    resources :theme_variants
    resources :industries
    resources :ad_types
    resources :video_types
    resources :transitions
    resources :facebook_targeting_specs
  end

  # Angular route globbing
  get '/scene_collections/:id/targeting', to: 'home#scene_editor', as: :targeting_scene_collection
  get '/scene_collections/:id/edit', to: 'home#scene_editor', as: :edit_scene_collection
  get '/scene_collections/:id/edit/*angular_path', to: 'home#scene_editor'
  get '/scene_collections/:id/summary', to: 'home#scene_editor'
  get '/previews/:video_job_id', to: 'home#scene_editor'
  get '/ad_config/:facebook_ad_id', to: 'home#scene_editor'
end
