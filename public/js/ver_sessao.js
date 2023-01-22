
function getSessaoJSON(){
    const username = localStorage.getItem("username");
    const usuario = {usuario:{username: username}}

    return usuario;
}

function sendVerSessao(){

    const url = '/login'
    const json = getSessaoJSON();

    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      }).then(function (response) {
        if(response.status == 200){
          if(window.location.pathname.toString() == '/login'){
            window.location.href= '/profile';

          }
         
        }else{

          if(window.location.pathname.toString() != '/login'){
            window.location.href= '/login';

          }
              
        }

        
    });
    }
    
}

document.addEventListener("turbolinks:load", sendVerSessao());