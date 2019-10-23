


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
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      }).then(res => res.json())
      .then(function(json){
          var notice = JSON.parse(JSON.stringify(json));
          validarStatus(notice);
      });

}




function validarStatus(notice){
    if (notice.message == 'Unauthorized'){
      alert('Email ou senha invalido');
    }else{
      localStorage.setItem('id',notice[0].id);
      localStorage.setItem('email',notice[0].email);
      localStorage.setItem('senha',notice[0].senha);
      window.location.href = '/profile';
    }

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


