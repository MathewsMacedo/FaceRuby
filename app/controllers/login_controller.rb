class LoginController < ApplicationController
    
    def index
        usuario = findUser
        render :json => usuario
    end

    def create
        if login_params[:username].blank?
            begin
                payload = {
                    email: login_params[:email],
                    password: login_params[:senha],
                }
                response = Faraday.post 'http://account-ms:3001/api/restrito/v1/auth/login',payload , {}
            rescue => e
                render json: { error:  'Ocorreu um erro, tente novamente mais tarde' }, status: 500  && return
            end
            
            if response.status > 400

                render json: { error:  'Usuario ou senha inválida' }, status: 400  && return
            end
        end
           
        usuario = Usuario.find_by(username: login_params[:username].presence || JSON.parse(response.body)["username"])
        
        if !usuario.blank?
            respond_to do |format|
                format.json {render :json => response&.body.presence || {username: login_params[:username]}}
            end
            return
        end
        respond_to do |format|
            format.json{ render :status => "401", :json => {:message => "Unauthorized"}.to_json }
        end
    end

    def findUser
        user = Usuario.new login_params
        
        usuario = Usuario.where(username: user.username) 
    end


    def login_params
        params.require(:usuario).permit(:username,:email,:senha)
    end
 
    def set_login
        @usuario = Usuario.username(params[:username]);
    end
end
