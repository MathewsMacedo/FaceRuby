class ProfileController < ApplicationController


    
    def show 
        profile = Usuario.where("id = ?", params[:id])  
        render :json => profile[0]
    end

    def biografia_post
        usuario = findUser
        ver = usuario.update biografia_params
        verificar ver
    end

    def detalhes_post 
        usuario = findUser
        ver = usuario.update detalhes_params
        verificar ver
    end


    def verificar(usuario)
        if usuario
            respond_to do |format|
                format.json {render :json => usuario}
            end
            return
        end
        respond_to do |format|
            format.json{ render :status => "401", :json => {:message => "Unauthorized"}.to_json }
        end
    end    


    private

    def usuario_params
        params.require(:usuario).permit(:id,:email,:senha)
    end

    def biografia_params
        params.require(:usuario).permit(:id,:email,:senha,:biografia)
    end

    def detalhes_params
        params.require(:usuario).permit(:id,:email,:senha,:cidade_atual,:cidade_natal,:estado_civil)
    end

    def findUser
        user = Usuario.new usuario_params
        usuario = Usuario.where("id = ? and email = ? and senha = ?",user.id, user.email, user.senha) 
    end

end
