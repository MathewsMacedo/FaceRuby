class ProfileController < ApplicationController
    
    def show 
        profile = Usuario.where("id = ?", params[:id])  
        render :json => profile[0]
    end
end
