
puts "Kafka | Environment: #{Rails.env}"

DeliveryBoy.configure do |config|
    config.brokers = YAML.load_file(File.join(Rails.root, "config", "kafka.yml"))[Rails.env]["brokers"]
end

DeliveryBoy.deliver("", topic: "users-upsert")
DeliveryBoy.deliver("", topic: "contents-upsert")

Racecar.configure do |config|
    config.brokers = YAML.load_file(File.join(Rails.root, "config", "kafka.yml"))[Rails.env]["brokers"]
end