import getUrlParameter from "getUrlParameter.js";
import preparePost from "post.js";
import preparePut from "put.js";
import addCheckAtInputEvent from "inputChecker.js";

// When click on image preview, open file picker window
document.getElementById('uploadImage').addEventListener('click', ()=>{
  document.querySelector("input[type=file").click()
})

(() => {
  // Check if an id is sent in url and use it
  const idUrl = getUrlParameter("id");
  // Inputs receive an event listener to check their values when user types
  addCheckAtInputEvent();
  // If an id is retrieved, use put to update character
  // Else post to create a new character
  if(idUrl){ preparePut(idUrl); }
  else { preparePost(); }
})();