
function uploadCapa(){
    document.querySelector('#filecapa').click();
   
 
}

window.addEventListener('load', function() {
    document.querySelector('#filecapa').style.display = 'none';
    document.querySelector('#filecapa').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var file = document.getElementById("filecapa").files[0];
            var reader = new FileReader();
            reader.onloadend = function(){
               document.getElementById('capa-img').style.backgroundImage = "url(" + reader.result + ")";        
            }
            if(file){
               reader.readAsDataURL(file);
             }else{
             }
        }
    });
  });
  
  function imageIsLoaded(e) { alert(e); }