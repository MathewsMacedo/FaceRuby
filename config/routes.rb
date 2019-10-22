Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/cadastro_usuario', to: 'cadastro_usuario#create'
  post '/login', to: 'login#create'
  post '/upload_img', to: 'upload_img#create'
  root :to => redirect("login")
end