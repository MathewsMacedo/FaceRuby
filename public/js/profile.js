var img_base64;

function getIMGJSON(send){
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');
    var json;
    if(send == '#capa-img'){
     json = {usuario:{email: email,senha: senha,img_capa: img_base64.toString(),img_profile: null}};
    }else{
        json = {usuario:{email: email,senha: senha,img_capa: null,img_profile: img_base64.toString()}};
    }
    return json;
}


function uploadIMG(obj,send){
    document.querySelector(obj).addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var file = document.querySelector(obj).files[0];
            var reader = new FileReader();
            reader.onloadend = function(){
                document.querySelector(send).style.backgroundImage = "url(" + reader.result + ")";  
                img_base64 = reader.result;
                sendIMG(send);
            }
            if(file){
               reader.readAsDataURL(file);
             }else{
             }
        }
    });
}


function sendPostagem(){

    var texto = document.querySelector('textarea#publicacao'); 
    if (!texto.value.trim()){
        return;
    }
    var data = new Date().toString();
    
    data = data.substring(3,24);

    document.querySelector('.publicacao').insertAdjacentHTML('afterend',"<div class=\"postagem\"> <div class=\"post-img\"></div><h5>Nome da Pessoa</h5><small>"+data+"</small><div class=\"conteudo\"></div></div>");
    document.querySelector('.conteudo').textContent = texto.value;
    texto.value = null;

}

function sendBiografia() {
    var new_bio = document.querySelector('textarea#biografia').value;
    document.querySelector('.biografia').innerHTML = "<span id=\"biografia\">" +
     new_bio + "</span> <div class= \"btn-apresentacao\"><input type=\"button\" id=\"btn-biografia\" class=\"btn btn-default  btn-app\" value=\"Editar Biografia\"/></div>";
    biografia();
  }



function updateBiografia(){
    if(document.querySelector('span#biografia')){
        var bio = document.querySelector('span#biografia').textContent;
        document.querySelector('.biografia').innerHTML = " <textarea class=\"form-control\" id=\"biografia\" name=\"biografia\" style=\"resize: none\" rows=\"4\" maxlength=\"220\">" + 
        bio + "</textarea> <div class= \"btn-apresentacao\"><input type=\"button\" id=\"btn-biografia-update\" class=\"btn btn-success  btn-app\" value=\"Confirmar\"></div>";
        document.querySelector('textarea#biografia').focus();
        document.querySelector('#btn-biografia-update').addEventListener('click',function(){ sendBiografia()});        
    }
}


function sendIMG(send){
      var url = '/upload_img'
      var json = getIMGJSON(send);  
      console.log(json);  
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(json)
        }).then(function (response) {
          if(response.status == 200){
            alert('Success');
          }else if(response.status == 401){
            alert('Falha na alteração');
          }else{
            
             // window.location.href= '/500';
          }
      });
  
  }

function logoff(){

    localStorage.removeItem('email');
    localStorage.removeItem('senha');
}


function publicar(){
    document.querySelector('.btn-publicar').addEventListener('click', function(){ sendPostagem() });
}


function biografia(){
    document.querySelector('#btn-biografia').addEventListener('click', function(){ updateBiografia() });
}


function sair(){

    document.querySelector('#sair').addEventListener('click', function(){ logoff() });
}


function uploadCapa(){
    document.querySelector('#file-capa').click();
}

function uploadProfile(){
    document.querySelector('#file-profile').click();
}


/*CARREGAR FUNÇÕES*/
window.addEventListener('load', function() {
    uploadIMG('#file-capa','#capa-img');
    uploadIMG('#file-profile','#profile-img');
    publicar();
    biografia();
    sair();
  });
