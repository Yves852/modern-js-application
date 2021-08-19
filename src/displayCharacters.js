import { getCharacter } from "./get.js";
import { getUrlParameter } from "./getUrlParameter.js";
import { renderListCharacters, renderOneCharacter } from "./renderCharacters.js";

const displayCharacters = async (name) => {
  // Check if an id is sent in url or a name by paramerer and use it on getCharacter
  const idUrl = getUrlParameter("id");
  let nameParam = name ? name : "";
  const characters = idUrl 
    ? await getCharacter(idUrl, null) 
    : nameParam.length > 0 
      ? await getCharacter(null, nameParam) 
      : await getCharacter(null, null);
  const target = document.getElementById("pool");
  
  // Check if target have already elements, empty it if so
  if(target.children && target.children.length > 0) { 
    while(target.lastChild) { target.removeChild(target.lastChild); }; 
  }

  // If receive an array of multiple characters, loop on it and display and prepare buttons
  // Else display the unique character card with adapted style and buttons
  if(characters[0] != undefined && characters.length > 0){
    renderListCharacters(target, characters);
  }
  else if(characters.id) {
    renderOneCharacter(target, characters);
  }
}

export { displayCharacters };