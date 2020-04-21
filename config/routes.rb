Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: 'users/registrations', sessions: 'users/sessions', passwords: 'users/passwords'}
  root 'movies#index'
  resources :users, only: [:index, :edit, :update]
  resources :movies, only: [:index, :new, :create, :edit, :update] do
    resources :tweets, only: [:index, :create]

    namespace :api do
      resources :tweets, only: :index, defaults: { format: 'json' }
    end
  end
end
