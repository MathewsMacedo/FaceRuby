
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


function publicar(){
    document.querySelector('.btn-publicar').addEventListener('click', function(){ sendPostagem() });
}


function biografia(){
    document.querySelector('#btn-biografia').addEventListener('click', function(){ updateBiografia() });
}


window.addEventListener('load', function() {
    uploadIMG('#file-capa','#capa-img');
    uploadIMG('#file-profile','#profile-img');
    publicar();
    biografia();
  });
