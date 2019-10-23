class LoginController < ApplicationController
    
    def index
        usuario = findUser
        render :json => usuario
    end

    def create
        usuario = findUser
        if !usuario.blank?
            respond_to do |format|
                format.json {render :json => usuario}
            end
            return
        end
        respond_to do |format|
            format.json{ render :status => "401", :json => {:message => "Unauthorized"}.to_json }
        end
    end

    def findUser
        user = Usuario.new login_params
        if user.id.nil? 
        usuario = Usuario.where("email = ? and senha = ?",user.email,user.senha) 
        else
        usuario = Usuario.where("id = ? and email = ? and senha = ?",user.id, user.email, user.senha) 
        end
    end


    def login_params
        params.require(:usuario).permit(:id,:email,:senha)
    end
 
    def set_login
        @usuario = Usuario.id(params[:id]);
    end
end
