class CadastroUsuarioController < ApplicationController

    def create 
        @usuario = Usuario.new usuario_params
        if @usuario
            respond_to do |format|
                format.js{ redirect_to '/profile.html' , turbolinks: false}
            end
        end
    end

    private

    def usuario_params   
        params.permit(:nome,:sobrenome,:email,:senha,:data_nasc,:sexo)
    end

    def set_usuario
        @usuario = Usuario.find(params[:id])
    end

end
