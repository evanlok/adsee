Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  authenticated :user do
    root 'scene_collections#new', as: :authenticated_root
  end

  root to: redirect(ENV['HOME_URL']), id: :home

  resources :industries, only: [:index] do
    resources :ad_types, only: [:index]
  end

  resources :ad_types, only: [] do
    resources :themes, only: [:index, :show], shallow: true
  end

  resources :scene_collections, only: [:index, :show, :new, :create, :update], shallow: true do
    get :summary_info, on: :member

    resources :scene_contents, except: [:new, :edit] do
      resources :scene_attributes, only: [:create, :update]
    end

    resources :video_jobs, only: [:index, :show] do
      collection do
        post :preview
        post :generate
      end
    end

    resources :facebook_ads, only: [:show, :create, :update]
  end

  resources :users, only: [] do
    collection do
      get :facebook_data
      get :facebook_pages
    end
  end

  resources :scenes, only: [:index]
  resources :images, only: [:index, :create, :destroy]
  resources :video_clips, only: [:index, :create, :destroy]
  resources :facebook_targeting_specs, only: [:index]

  post '/hal_callbacks/:video_job_id', to: 'hal_callbacks#create', as: :video_callback
  post '/hal_callbacks/:video_job_id/stream', to: 'hal_callbacks#stream', as: :stream_callback
  post '/hal_callbacks/:video_job_id/preview', to: 'hal_callbacks#preview', as: :preview_callback
  post '/encoder_callbacks/video_clips/:id', to: 'encoder_callbacks#video_clip', as: :video_clip_encoding_callback

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
    resources :images
    resources :video_clips
  end

  # Angular route globbing
  get '/scene_collections/:id/targeting', to: 'home#scene_editor', as: :targeting_scene_collection
  get '/scene_collections/:id/edit', to: 'home#scene_editor', as: :edit_scene_collection
  get '/scene_collections/:id/edit/*angular_path', to: 'home#scene_editor'
  get '/scene_collections/:id/summary', to: 'home#scene_editor'
  get '/scene_collections/:id/previews/:video_job_id', to: 'home#scene_editor'
  get '/scene_collections/:id/ad_config/:facebook_ad_id', to: 'home#scene_editor'
  get '/scene_collections/:id/facebook_post', to: 'home#scene_editor'
end
