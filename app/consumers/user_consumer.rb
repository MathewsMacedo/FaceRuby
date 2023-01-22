class UserConsumer < Racecar::Consumer
    subscribes_to "users-upsert"

    def process(message)
        return if message.value.blank?
        data = JSON.parse(message.value, symbolize_names: true)
        
        usuario = Usuario.find_by(username: data[:username]).presence || Usuario.new
        
        usuario.nome = data[:firstname].to_s
        usuario.sobrenome = data[:lastname].to_s
        usuario.sobrenome = data[:lastname].to_s
        usuario.username = data[:username].to_s
        
        usuario.save!
    end
end