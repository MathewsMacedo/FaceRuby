class ProfileController < ApplicationController

    class Postagem
        attr_accessor :nome, :texto, :data, :id_conteudo
         def initialize(id_conteudo, nome, texto, data)
             self.id_conteudo = id_conteudo
             self.nome = nome
             self.texto = texto 
             self.data = data
         end
     end


    
    def show 
        profile = Usuario.where("username = ?", params[:username])  
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


  

    def getConteudo
        usuario = Usuario.where("username = ?", params[:username]) 
        user  = usuario[0]
        conteudos = Conteudo.where("id_usuario = ?",user.id)
        post = []
        conteudos.each do |content|   
            nome = "" 
            nome <<   user.nome << " " << user.sobrenome   
          conteudo  = Postagem.new(content.id,nome,content.texto,content.created_at)
          post << conteudo
        end   
        render :json =>  post
    end

    def conteudo_create
        usuario = findUser
        if !usuario.blank?  
            conteudo = Conteudo.new({id_usuario: usuario[0].id, texto: conteudo_params[:texto]})
            if conteudo.save
                DeliveryBoy.deliver( conteudo.to_json, topic: 'contents-upsert')
                respond_to do |format|
                    format.json { head 200 }
                end
            end
        else
            verificar usuario
        end
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
        params.require(:usuario).permit(:id,:username,:email,:senha)
    end

    def biografia_params
        params.require(:usuario).permit(:id,:username,:email,:senha,:biografia)
    end

    def detalhes_params
        params.require(:usuario).permit(:id,:username,:email,:senha,:cidade_atual,:cidade_natal,:estado_civil)
    end

    def conteudo_params
        params.require(:conteudo).permit(:username, :id_usuario,:texto)
    end

    def findUser
        user = Usuario.new usuario_params
        usuario = Usuario.where("username = ? ",user.username) 
    end

end
