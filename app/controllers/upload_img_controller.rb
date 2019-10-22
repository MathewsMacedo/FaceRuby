class UploadImgController < ApplicationController

    def create 
        if definir_foto
            respond_to do |format|
                format.json { head 200}
            end
          
        else
            respond_to do |format|
                format.json { head 401}
            end
        end
    end

    def findUser
        user = Usuario.new img_params
        usuario = Usuario.where("email = ? and senha = ?",user.email,user.senha) 
    end

    def definir_foto
        usuario = findUser[0]
        user_img = Usuario.new img_params
        if user_img.img_capa == nil 
            usuario.img_profile = user_img.img_profile
            return usuario.update img_profile_params
        end
            usuario.img_capa = user_img.img_capa
            return usuario.update img_capa_params
    end



    private

    def img_params
        params.require(:usuario).permit(:email,:senha,:img_capa,:img_profile)
    end

    def img_capa_params
        params.require(:usuario).permit(:img_capa)
    end

    def img_profile_params
        params.require(:usuario).permit(:img_profile)
    end
end
