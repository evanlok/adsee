Rails.application.routes.draw do
  devise_for :users

  root 'home#index'

  namespace :admin do
    root 'scenes#index'

    resources :scenes, only: [:index, :edit, :update, :destroy] do
      get :tags, on: :collection
    end
    resources :songs
    resources :themes
    resources :theme_variants
    resources :industries
    resources :ad_types
    resources :video_types
  end
end
