var img_base64;
var user;
var conteudo;

fetch('/userdata/'+localStorage.getItem('id'))
.then(res => res.json())
.then(function(json){
    var usuario = JSON.parse(JSON.stringify(json));
    user =  usuario;
    loadProfile(usuario,conteudo);
});

fetch('/getConteudo/'+localStorage.getItem('id'))
.then(res => res.json())
.then(function(json){
    var content = JSON.parse(JSON.stringify(json));
    conteudo =  content;
    loadProfile(user,content);
});



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

function getBiografiaJSON(){
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');
    const id = localStorage.getItem('id');
    const biografia = document.querySelector('#biografia').value;
    const json = {usuario:{id: id,email: email,senha: senha,biografia: biografia}}
    return json;
}


function getDetalhesJSON(){

    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');
    const id = localStorage.getItem('id');
    const cidadeAtual = document.querySelector('input#cidade-atual').value;
    const cidadeNatal = document.querySelector('input#cidade-natal').value;
    const estadoCivil = document.querySelector('input#estado-civil').value;
    const json = {usuario:{id: id,email: email,senha: senha,cidade_atual: cidadeAtual,cidade_natal: cidadeNatal,estado_civil: estadoCivil}}
    return json;

}

function getConteudoJSON(){
    const id_usuario = localStorage.getItem('id');
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');
    const texto = document.querySelector('textarea#publicacao').value;

    const json = {conteudo:{id_usuario: id_usuario, texto: texto}, usuario:{id: id_usuario,email: email,senha: senha}}
    
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

    const texto = document.querySelector('textarea#publicacao'); 
    if (!texto.value.trim()){
        return;
    }
    
    var data = new Date().toString();
    const url = '/conteudo_post'
    const json = getConteudoJSON();

    set_POST(url,json);

    data = data.substring(3,24);

    document.querySelector('.publicacao').insertAdjacentHTML('afterend',"<div class=\"postagem\"> <div class=\"post-img\"></div><h5>Nome da Pessoa</h5><small>"+data+"</small><div class=\"conteudo\"></div></div>");
    document.querySelector('.conteudo').textContent = texto.value;
    document.querySelector('.post-img').style.backgroundImage = "url(" + user.img_profile.toString() + ")"; 

    texto.value = null;

}

function fixedBiografia() {
    var new_bio = document.querySelector('textarea#biografia').value;
    document.querySelector('.biografia').innerHTML = "<span id=\"biografia\"></span> <div class= \"btn-apresentacao\"><input type=\"button\" id=\"btn-biografia\" class=\"btn btn-default  btn-app\" value=\"Editar Biografia\"/></div>";
    document.querySelector('span#biografia').textContent = new_bio;
    biografia();
  }


function updateBiografia(){
    if(document.querySelector('span#biografia')){
        var bio = document.querySelector('span#biografia').textContent;
        document.querySelector('.biografia').innerHTML = " <textarea class=\"form-control\" id=\"biografia\" name=\"biografia\" style=\"resize: none\" rows=\"4\" maxlength=\"220\">" + 
         "</textarea> <div class= \"btn-apresentacao\"><input type=\"button\" id=\"btn-biografia-update\" class=\"btn btn-success  btn-app\" value=\"Confirmar\"></div>";
        document.querySelector('textarea#biografia').focus();
        document.querySelector('textarea#biografia').value = bio;
        document.querySelector('#btn-biografia-update').addEventListener('click',function(){ sendBiografia(); fixedBiografia();});        
    }
}
    
function sendBiografia(){
        var url = '/biografia_post'
        var json = getBiografiaJSON();  
        
        set_POST(url,json);
    
    }


function sendDetalhes(){
    const url = '/detalhes_post'
    const json = getDetalhesJSON();

    set_POST(url,json);
}


function fixedDetalhes(){
    var new_cidadeAtual = document.querySelector('input#cidade-atual').value;
    var new_cidadeNatal = document.querySelector('input#cidade-natal').value;
    var new_EstadoCivil = document.querySelector('input#estado-civil').value;

    document.querySelector('.cidade-atual').innerHTML = `<div class="cidade-img"></div><span id="cidade-atual">Mora em <a id="cidade-atual" href=" " target="_blank"></a></span>`
    document.querySelector('.cidade-natal').innerHTML = `<div class="cidade-natal-img"></div><span id="cidade-natal">De <a id="cidade-natal" href=" " target="_blank"></a></span>`
    document.querySelector('.estado-civil').innerHTML = `<div class="estado-civil-img"></div><span id="estado-civil"></span>`  

    document.querySelector('a#cidade-atual').href = "https://www.google.com/maps/place/"+new_cidadeAtual;
    document.querySelector('a#cidade-natal').href = "https://www.google.com/maps/place/"+new_cidadeNatal;

    document.querySelector('a#cidade-atual').textContent = new_cidadeAtual;
    document.querySelector('a#cidade-natal').textContent = new_cidadeNatal;

    document.querySelector('span#estado-civil').textContent = new_EstadoCivil;
    document.querySelector('.btn-detalhes').innerHTML = `<input type="button" id="btn-detalhes" class="btn btn-default btn-app" value="Editar Detalhes">`
    detalhes();
}


function updateDetalhes(){

    if(document.querySelector('span#cidade-atual')){
        var cidadeAtual = document.querySelector('a#cidade-atual').textContent;
        var cidadeNatal = document.querySelector('a#cidade-natal').textContent;
        var EstadoCivil = document.querySelector('span#estado-civil').textContent;

        document.querySelector('.cidade-atual').innerHTML = `<div class="cidade-img"></div><input type="text" id="cidade-atual" name="cidade-atual" placeholder="Cidade Atual" class="form-group"/>`
        document.querySelector('.cidade-natal').innerHTML = `<div class="cidade-natal-img"></div><input type="text" id="cidade-natal" name="cidade-natal" placeholder="Cidade Natal" class="form-group"/>`
        document.querySelector('.estado-civil').innerHTML = `<div class="estado-civil-img"></div><input type="text" id="estado-civil" name="estado-civil" placeholder="Estado Civil"class="form-group"/>`
        document.querySelector('.btn-detalhes').innerHTML = `<input type="button" id="btn-detalhes-update" class="btn btn-success  btn-app" value="Confirmar">`
        document.querySelector('input#cidade-atual').focus();
        document.querySelector('input#cidade-atual').value = cidadeAtual;
        document.querySelector('input#cidade-natal').value = cidadeNatal;
        document.querySelector('input#estado-civil').value = EstadoCivil;
        document.querySelector('#btn-detalhes-update').addEventListener('click',function(){ sendDetalhes(); fixedDetalhes();});  
    }


}



  function sendIMG(send){
    var url = '/upload_img'
    var json = getIMGJSON(send);  

    set_POST(url,json);

}

function set_POST(url,json){

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

    localStorage.clear();
}


function publicar(){
    document.querySelector('.btn-publicar').addEventListener('click', function(){ sendPostagem(); });
}




function biografia(){
    document.querySelector('#btn-biografia').addEventListener('click', function(){ updateBiografia() });
}

function detalhes(){
    document.querySelector('#btn-detalhes').addEventListener('click', function(){ updateDetalhes() });
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

function verificarProfile(user,conteudo){
    if(!user){
        if(!conteudo){

            return
        }
    
    }


}

function loadProfile(user,conteudo){
    if(user){
    document.querySelector('#capa-img').style.backgroundImage = "url(" + user.img_capa + ")"; 
    document.querySelector('#profile-img').style.backgroundImage = "url(" + user.img_profile + ")"; 
    document.querySelector('#biografia').textContent = user.biografia;
    document.querySelector('a#cidade-atual').href = "https://www.google.com/maps/place/"+user.cidade_atual;
    document.querySelector('a#cidade-natal').href = "https://www.google.com/maps/place/"+user.cidade_natal;

    document.querySelector('a#cidade-atual').textContent = user.cidade_atual;
    document.querySelector('a#cidade-natal').textContent = user.cidade_natal;

    document.querySelector('span#estado-civil').textContent = user.estado_civil;
    
    if(conteudo){
        const count = conteudo.length;
        const nome = conteudo[0].nome;
        for(let i = 0; i < count;i++){
            document.querySelector('.publicacao').insertAdjacentHTML('afterend',"<div class=\"postagem\"> <div class=\"post-img\"></div><h5>"+nome+"</h5><small>"+"</small><div class=\"conteudo\"></div></div>");
            document.querySelector('.conteudo').textContent = conteudo[i].texto;
    
        }

    }
           

    myElement = document.querySelectorAll('.post-img');
    for(let i = 0; i < myElement.length; i++){
        myElement[i].style.backgroundImage = "url(" + user.img_profile.toString() + ")"; 
    }
}
}



/*CARREGAR FUNÇÕES*/
window.addEventListener('load', function() {
    uploadIMG('#file-capa','#capa-img');
    uploadIMG('#file-profile','#profile-img');
    publicar();
    biografia();
    detalhes();
    sair();
  });
