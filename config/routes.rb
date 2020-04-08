Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: 'users/registrations', sessions: 'users/sessions', passwords: 'users/passwords'}
  root 'tweets#index'
  resources :users, only: [:edit, :update]
end
