class LoginController < ApplicationController

    def create
        user = Usuario.new login_params
        usuario = Usuario.where("email = ? and senha = ?",user.email,user.senha) 
        if !usuario.blank?
            respond_to do |format|
                format.json{head 200}
            end
            return
        end
        respond_to do |format|
            format.json{head 401}
        end
    end

    
def findUser
   
end

    def login_params
        params.require(:usuario).permit(:email,:senha)
    end
 
    def set_login
        @usuario = Usuario.id(params[:id]);
    end
end
