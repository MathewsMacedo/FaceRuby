var img_base64;
var user;
var conteudo;

var opcaoPost = "<ul class=\"nav nav-pills post_opcao\">\n  <li class=\"dropdown\">\n    <a class=\"dropdown-toggle\"\n       data-toggle=\"dropdown\"\n       href=\"#\">...</a>\n    <ul class=\"dropdown-menu\">\n      <!-- links -->\n <li><a href=\"#\">Editar</a></li> <li><a href=\"#\">Excluir</a></li>   </ul>\n  </li>\n</ul>";



    fetch('/userdata/'+localStorage.getItem('username'))
.then(res => res.json())
.then(function(json){
    var usuario = JSON.parse(JSON.stringify(json));
    user =  usuario;
    loadProfile(usuario,conteudo);
});

fetch('/getConteudo/'+localStorage.getItem('username'))
.then(res => res.json())
.then(function(json){
    var content = JSON.parse(JSON.stringify(json));
    conteudo =  content;
    console.log(conteudo)
    loadProfile(user,content);
});



function getIMGJSON(send){
    var json;
    if(send == '#capa-img'){
     json = {usuario:{username:localStorage.getItem('username'), img_capa: img_base64.toString(),img_profile: null}};
    }else{
        json = {usuario:{username:localStorage.getItem('username'), img_capa: null,img_profile: img_base64.toString()}};
    }
    return json;
}

function getBiografiaJSON(){
    const username = localStorage.getItem('username');
    const biografia = document.querySelector('#biografia').value;
    const json = {usuario:{username: username,biografia: biografia}}
    return json;
}


function getDetalhesJSON(){

    const username = localStorage.getItem('username');
    const cidadeAtual = document.querySelector('input#cidade-atual').value;
    const cidadeNatal = document.querySelector('input#cidade-natal').value;
    const estadoCivil = document.querySelector('input#estado-civil').value;
    const json = {usuario:{username: username,cidade_atual: cidadeAtual,cidade_natal: cidadeNatal,estado_civil: estadoCivil}}
    return json;

}

function getConteudoJSON(){
    const username = localStorage.getItem('username');
    const texto = document.querySelector('textarea#publicacao').value;

    const json = {conteudo:{username: username, texto: texto}, usuario:{username: username}}
    
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

    document.querySelector('.all-publicacao').insertAdjacentHTML('afterbegin',"<div class=\"postagem\"> "+opcaoPost+"<div class=\"post-img\"></div><h5>"+user.nome+" "+user.sobrenome+"</h5><small>"+data+"</small><div class=\"conteudo\"></div></div>");
    document.querySelector('.conteudo').textContent = texto.value;
    document.querySelector('.post-img').style.backgroundImage = "url(" + user.img_profile.toString() + ")"; 

    texto.value = null;

}

function updatePostagem(id_conteudo){

    postagem = document.querySelector(".conteudo[data-id_conteudo=\""+id_conteudo+"\"]");

    const texto = postagem.textContent;

    postagem.innerHTML = "<textarea class=\"form-control\" id=\"editar_publicacao_"+id_conteudo+"\" name=\"editar_publicacao\" style=\"resize: none\" rows=\"4\"></textarea>";
    campo_post = document.querySelector("#editar_publicacao_"+id_conteudo)
    campo_post.textContent = texto;
    campo_post.insertAdjacentHTML('afterend',`<button type="button" class="btn btn-editar-publicacao btn-success">Editar</button>`);

}

function sendBiografia(){
        var url = '/biografia_post'
        var json = getBiografiaJSON();  
        
        set_POST(url,json);
    
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
          
            window.location.href= '/500';
        }
    });

}

function logoff(){
    localStorage.clear();
    window.location.href= '/login';
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
            const data = new Date(conteudo[i].data).toString().substring(3,24);
            const id_conteudo = conteudo[i].id_conteudo;
            var opcaoPost1 = "<ul class=\"nav nav-pills post_opcao\">\n  <li class=\"dropdown\">\n    <a class=\"dropdown-toggle\"\n       data-toggle=\"dropdown\"\n       href=\"#\">...</a>\n    <ul class=\"dropdown-menu\">\n      <!-- links -->\n <li><a class=\"editar-conteudo conteudo-ajuste\" data-id_conteudo=\""+id_conteudo+"\">Editar</a></li> <li><a class=\"excluir-conteudo conteudo-ajuste\" data-id_conteudo=\""+id_conteudo+"\">Excluir</a></li>   </ul>\n  </li>\n</ul>";    
            document.querySelector('.all-publicacao').insertAdjacentHTML('afterbegin',"<div class=\"postagem\" >"+opcaoPost1+"<div class=\"post-img\"></div><h5>"+nome+"</h5><small>"+data+"</small><div class=\"conteudo\" data-id_conteudo=\""+id_conteudo+"\"></div></div>");
            document.querySelector('.conteudo').textContent = conteudo[i].texto;
            document.querySelector("a[data-id_conteudo=\""+id_conteudo+"\"].editar-conteudo").addEventListener('click', function(){console.log(id_conteudo + " - Editar"); updatePostagem(id_conteudo);});
            document.querySelector("a[data-id_conteudo=\""+id_conteudo+"\"].excluir-conteudo").addEventListener('click', function(){console.log(id_conteudo + " - Excluir")});
       
        }

    }
           
         if(user.img_profile!=null){
             myElement = document.querySelectorAll('.post-img');
            for(let i = 0; i < myElement.length; i++){
                 myElement[i].style.backgroundImage = "url(" + user.img_profile.toString() + ")"; 
             }
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
