class ProfileController < ApplicationController


    
    def show 
        profile = Usuario.where("id = ?", params[:id])  
        render :json => profile[0]
    end

    def biografia_post
        usuario = findUser
        if usuario.update biografia_params
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

    def biografia_params
        params.require(:usuario).permit(:id,:email,:senha,:biografia)
    end

    def findUser
        user = Usuario.new biografia_params
        usuario = Usuario.where("id = ? and email = ? and senha = ?",user.id, user.email, user.senha) 
    end

end
