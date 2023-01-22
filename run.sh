#! /bin/ash
rails db:migrate
racecar --daemonize UserConsumer
puma -C config/puma.rb