function getCadastroJSON() {

    var nome = document.querySelector('#nome').value + " " + document.querySelector('#sobrenome').value;
    var email = document.querySelector('#email').value;
    var senha =  document.querySelector('#senha').value;
    var data = document.querySelector('#data_nascimento').value;
    var sexo = document.querySelector('input[name="sexo"]:checked').value;

    var cadastro = {cadastro:{nome: nome,email: email,senha: senha,data: data,sexo: sexo}}

    return cadastro;


}

function setPostJSON(){

    var url = '/login.html'
    var json = getCadastroJSON();
    console.log(json);
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      });





}



function cadastroPost(){
   
    console.log(setPostJSON(json));


}