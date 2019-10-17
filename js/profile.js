
function uploadCapa(){
    document.querySelector('#file-capa').click();
}

function uploadProfile(){
    document.querySelector('#file-profile').click();
}


function uploadIMG(obj,send){
    document.querySelector(obj).style.display = 'none';
    document.querySelector(obj).addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var file = document.querySelector(obj).files[0];
            var reader = new FileReader();
            reader.onloadend = function(){
                document.querySelector(send).style.backgroundImage = "url(" + reader.result + ")";        
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


function publicar(){

    document.querySelector('.btn-publicar').addEventListener('click', function(){ sendPostagem() });

}



window.addEventListener('load', function() {
    uploadIMG('#file-capa','#capa-img');
    uploadIMG('#file-profile','#profile-img');
    publicar();
  });
