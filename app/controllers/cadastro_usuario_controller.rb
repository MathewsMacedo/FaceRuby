class CadastroUsuarioController < ApplicationController

    def create 
        begin
            payload = {
                name: usuario_params[:nome] + " "+ usuario_params[:sobrenome],
                email: usuario_params[:email],
                username: usuario_params[:username],
                password: usuario_params[:senha],
                password_confirmation: usuario_params[:senha],

            }


            puts payload

            response = Faraday.post 'http://account-ms:3001/api/restrito/v1/user/users', payload, {}
        rescue => e
            puts e.message
            render json: { message: "Ocorreu um erro, tente novamente mais tarde!"}, status: 500
        end
        
        if response.status > 400
            render json: { message: "Dados inválido, revise os dados e tente novamente"}, status: 400
        end

        render json: {}, status: 201
    end

    private

    def usuario_params   
        params.require(:usuario).permit(:nome,:sobrenome,:email,:senha,:data_nasc,:sexo, :username)
    end
end
