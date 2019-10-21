function getCadastroJSON() {

    var nome = document.querySelector('#nome').value;
    var sobrenome = document.querySelector('#sobrenome').value;
    var email = document.querySelector('#email').value.toString().toLowerCase();
    var senha =  document.querySelector('#senha').value;
    var data_nasc = document.querySelector('#data_nascimento').value;
    var sexo = document.querySelector('input[name="sexo"]:checked').value;

    var cadastro = {usuario:{nome: nome,sobrenome:sobrenome,email: email,senha: senha,data_nasc: data_nasc,sexo: sexo}}

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
          window.location.href= '/profile';
        }else{
          window.location.href= '/500';
        }
    });

}



function cadastroUsuario(){

  setPostJSON();
}


function cadastro(){
   
    document.querySelector('#btn-cadastro').addEventListener('click',function(){ alert('ola'); cadastroUsuario()});


}



window.addEventListener('load', function() {

  cadastro();

});
