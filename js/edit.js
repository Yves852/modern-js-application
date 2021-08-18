// When click on image preview, open file picker window
document.getElementById('uploadImage').addEventListener('click', ()=>{
  document.querySelector("input[type=file").click()
})

let idUrl;

(() => {
  // Check if an id is sent in url and use it
  const params = new URLSearchParams(window.location.search);
  idUrl = params.get("id");

  // If an id is retrieved, use put to update character
  // Else post to create a new character
  if(idUrl){ preparePut(idUrl); }
  else { preparePost(); }
})();