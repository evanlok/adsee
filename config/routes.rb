require 'sidekiq/web'

Rails.application.routes.draw do
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  authenticated :user do
    root to: redirect('/theme_selector'), as: :authenticated_root
  end

  resources :industries, only: :index
  resources :ad_types, only: :index
  resources :themes, only: [:index, :show]
  resources :theme_variants, only: [:show]
  resources :theme_recommendation_groups, only: :index

  resources :scene_collections, except: :edit, shallow: true do
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

    resources :facebook_ads, only: [:show, :create, :update] do
      put :update_targeting_spec, on: :member
    end
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
  resources :icons, only: :index
  resources :facebook_targeting_specs, only: [:index]
  resources :fonts, only: :index
  resources :songs, only: :index
  resources :filters, only: :index
  resources :profile_reports, only: [:index, :show, :create, :update]

  get '/contact', to: 'contacts#new', as: :contact
  resources 'contacts', only: [:new, :create]

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
    resources :song_categories
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
    resources :filters
    resources :theme_recommendation_groups do
      get :available_targeting_specs, on: :collection
    end
  end

  # Angular route globbing
  get '/theme_selector', to: 'home#angular', as: :theme_selector
  get '/smart_create', to: 'home#angular', as: :smart_create
  get '/scene_collections/:id/audience', to: 'home#angular'
  get '/scene_collections/:id/themes', to: 'home#angular'
  get '/scene_collections/:id/targeting', to: 'home#angular', as: :targeting_scene_collection
  get '/scene_collections/:id/targeting/*angular_path', to: 'home#angular'
  get '/scene_collections/:id/edit', to: 'home#angular', as: :edit_scene_collection
  get '/scene_collections/:id/edit/*angular_path', to: 'home#angular'
  get '/scene_collections/:id/summary', to: 'home#angular'
  get '/scene_collections/:id/previews/:video_job_id', to: 'home#angular'
  get '/scene_collections/:id/ad_config/:facebook_ad_id', to: 'home#angular'
  get '/scene_collections/:id/facebook_post', to: 'home#angular'
  get '/reports/:id', to: 'home#angular'
  get '/reports', to: 'home#angular', as: :reports
  get '/ad_insights/:id', to: 'home#angular'
end
