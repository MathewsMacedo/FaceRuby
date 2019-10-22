class LoginController < ApplicationController

    def create
        user = Usuario.new login_params
        usuario = Usuario.where("email = ? and senha = ?",user.email,user.senha) 
        if !usuario.blank?
            respond_to do |format|
                format.json{ render :json => {:usuario => {:id => usuario[0].id}},:status => 200  }
            end
            return
        end
        respond_to do |format|
            format.json{ render :status => "401", :json => {:message => "error"}.to_json }
        end
    end

    


    def login_params
        params.require(:usuario).permit(:email,:senha)
    end
 
    def set_login
        @usuario = Usuario.id(params[:id]);
    end
end
