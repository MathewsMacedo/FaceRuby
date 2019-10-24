class CreateConteudos < ActiveRecord::Migration[5.2]
  def change
    create_table :conteudos do |t|
      t.integer :id_usuario
      t.text :texto
      t.string :media
      t.string :local
      t.string :sentimento
      t.string :background
      t.integer :visibilidade
      t.integer :id_share
      t.integer :status
      t.string :ip

      t.timestamps
    end
  end
end
