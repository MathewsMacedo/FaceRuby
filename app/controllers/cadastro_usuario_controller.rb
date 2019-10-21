class CadastroUsuarioController < ApplicationController

    def create 
        @usuario = Usuario.new usuario_params
        if @usuario.save
            respond_to do |format|
                format.json { head 201 }
            end
        end
    end

    private

    def usuario_params   
        params.require(:usuario).permit(:nome,:sobrenome,:email,:senha,:data_nasc,:sexo)
    end

    def set_usuario
        @usuario = Usuario.find(params[:id])
    end

end
