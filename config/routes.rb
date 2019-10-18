Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :cadastro_usuario
  resources :login
  root :to => redirect("login")
end