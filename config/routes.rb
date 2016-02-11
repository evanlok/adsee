Rails.application.routes.draw do
  devise_for :users

  root 'home#index'

  namespace :admin do
    root 'scenes#index'

    resources :scenes, only: [:index, :edit, :update, :destroy] do
      get :tags, on: :collection
    end
  end
end
