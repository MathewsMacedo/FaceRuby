
function getSessaoJSON(){
    const email = localStorage.getItem("email");
    const senha = localStorage.getItem("senha");
    const usuario = {usuario:{email: email,senha: senha}}

    return usuario;
}

function sendVerSessao(){

    const url = '/login'
    const json = getSessaoJSON();
    console.log(json);
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      }).then(function (response) {
        if(response.status == 200){
         
        }else{

          if(window.location.pathname.toString() != '/login'){
            window.location.href= '/login';

          }
              
        }
    });
}

document.addEventListener("turbolinks:load", sendVerSessao());