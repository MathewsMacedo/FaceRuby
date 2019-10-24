# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_24_192714) do

  create_table "conteudos", force: :cascade do |t|
    t.integer "id_usuario"
    t.text "texto"
    t.string "media"
    t.string "local"
    t.string "sentimento"
    t.string "background"
    t.integer "visibilidade"
    t.integer "id_share"
    t.integer "status"
    t.string "ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "usuarios", force: :cascade do |t|
    t.string "nome"
    t.string "sobrenome"
    t.string "email"
    t.string "senha"
    t.string "data_nasc"
    t.string "sexo"
    t.text "biografia"
    t.string "cidade_atual"
    t.string "cidade_natal"
    t.string "estado_civil"
    t.string "username"
    t.string "img_profile"
    t.string "img_capa"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
