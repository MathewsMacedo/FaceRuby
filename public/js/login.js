


function getLoginJSON(){
  var email = document.querySelector('#email-login').value.toString().toLowerCase();
  var senha = document.querySelector('#senha-login').value;
    var logar  = {usuario:{email: email,senha: senha}};

    return logar;
}


function sendLogin(){
  var email = document.querySelector('#email-login').value.toString().toLowerCase();
  var senha = document.querySelector('#senha-login').value;
    var url = '/login'
    var json = getLoginJSON();
    console.log(json);
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      }).then(function (response) {
        if(response.status == 200){
          window.location.href= '/profile';
          localStorage.setItem("email", email);
          localStorage.setItem("senha", senha);
        }else if(response.status == 401){
          alert('E-mail ou senha incorreto!\nAcesso negado! Erro:401');
        }else{
            window.location.href= '/500';
        }
    });

}



function userlogin(){
    sendLogin();
}




function entrar(){
    document.querySelector('#btn-entrar').addEventListener('click', function(){ userlogin() })

}

window.addEventListener('load', function(){

entrar();

});


