function getCadastroJSON() {

    var nome = document.querySelector('#nome').value;
    var sobrenome = document.querySelector('#sobrenome').value;
    var email = document.querySelector('#email').value.toString().toLowerCase();
    var senha =  document.querySelector('#senha').value;
    //var data_nasc = document.querySelector('#data_nascimento').value;
    var username = document.querySelector('#username').value;
    var sexo = document.querySelector('input[name="sexo"]:checked').value;

    var cadastro = {usuario:{nome: nome,sobrenome:sobrenome,email: email,senha: senha,sexo: sexo, username:username}}

    return cadastro;


}

function setPostJSON(){

    var url = '/cadastro_usuario'
    var json = getCadastroJSON();
    console.log(json);
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      }).then(function (response) {
        if(response.status == 201){
          document.querySelector('#nome').value = ""
          document.querySelector('#sobrenome').value = ""
          document.querySelector('#email').value = ""
          document.querySelector('#senha').value = ""
          //var data_nasc = document.querySelector('#data_nascimento').value;
          document.querySelector('#username').value = ""
        }else{
          window.location.href= '/500';
        }
    });

}



function cadastroUsuario(){

  setPostJSON();
}


function cadastro(){
   
    document.querySelector('#btn-cadastro').addEventListener('click',function(){ alert('Cadastro concluido com sucesso ;)'); cadastroUsuario()});


}



window.addEventListener('load', function() {

  cadastro();

});
