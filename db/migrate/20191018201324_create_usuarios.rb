class CreateUsuarios < ActiveRecord::Migration[5.2]
  def change
    create_table :usuarios do |t|
      t.string :nome
      t.string :sobrenome
      t.string :email
      t.string :senha
      t.string :data_nasc
      t.string :sexo
      t.text :biografia
      t.string :cidade_atual
      t.string :cidade_natal
      t.string :estado_civil
      t.string :username
      t.string :img_profile
      t.string :img_capa
      t.integer :status

      t.timestamps
    end
  end
end
