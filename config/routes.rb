Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/cadastro_usuario', to: 'cadastro_usuario#create'
  post '/login', to: 'login#create'
  get '/userdata/:id', to: 'profile#show', as: 'userdata'
  get '/getConteudo/:id', to: 'profile#getConteudo', as: 'getConteudo'
  post '/biografia_post', to: 'profile#biografia_post', as: 'biografia_post'
  post '/detalhes_post', to: 'profile#detalhes_post', as: 'detalhes_post'
  post '/conteudo_post', to: 'profile#conteudo_create', as: 'conteudo_post'
  post '/upload_img', to: 'upload_img#create'
  root :to => redirect("login")
end