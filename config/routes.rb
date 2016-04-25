Rails.application.routes.draw do
  devise_for :users

  root 'industries#index'

  resources :industries, only: [:index] do
    resources :ad_types, only: [:index]
  end

  resources :ad_types, only: [] do
    resources :themes, only: [:index, :show], shallow: true
  end

  resources :scene_collections, only: [:show, :create, :update], shallow: true do
    resources :scene_contents, except: [:new, :edit] do
      resources :scene_attributes, only: [:create, :update]
    end

    resources :video_jobs, only: [:show] do
      collection do
        post :preview
        post :generate
      end
    end
  end

  resources :scenes, only: [:index]
  resources :images, only: [:index, :create, :destroy]
  resources :video_clips, only: [:index, :create, :destroy]

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
  end

  # Angular route globbing
  get '/scene_collections/:id/edit', to: 'home#scene_editor', as: :edit_scene_collection
  get '/scene_collections/:id/edit/*angular_path', to: 'home#scene_editor'
  get '/previews/:video_job_id', to: 'home#scene_editor'
end
