import { del } from './delete.js';

const template = document.getElementById("template");
/* Function creating cards from template and filling with data */
const renderListCharacters = (target, characters) => {
  // Check if target has class cardPool and add it
  if(!target.classList || !target.classList.contains("cardPool")) { target.classList.add("cardPool"); }
  // Loop on characters, create cards and add them to target
  characters.forEach((character) => {
    let clone = template.content.cloneNode(true);
    clone.querySelector(".card__button").addEventListener("click", ()=>{
      // Onclick, Open a new tab of index.html with the character id as parameter
      window.open(`./index.html?id=${character.id}`, '_blank');
    });
    clone.querySelector(".card__img").src = `data:image/png;base64,${character.image}`;
    clone.querySelector(".card__h3").innerHTML = character.name;
    clone.querySelector(".card__p").innerHTML = character.shortDescription;
    target.appendChild(clone);
  });
}

// Take ont character and render on screen
const renderOneCharacter = (target, character) => {
  // Create card from template
  let clone = template.content.cloneNode(true);
  clone.children[0].appendChild(document.createElement("p")); 
  clone.querySelectorAll("p")[1].classList.add("card__p");
  clone.querySelector(".card__img").src = `data:image/png;base64,${character.image}`;
  clone.querySelector(".card__h3").innerHTML = character.name;
  clone.querySelectorAll(".card__p")[0].innerHTML = character.shortDescription;
  clone.querySelectorAll(".card__p")[1].innerHTML = character.description;

  // Switch class for one card render
  clone.children[0].classList.remove("card--pool");
  clone.children[0].classList.add("card--alone");
  clone.children[0].classList.add("centerContent");

  // Create new buttons
  let btnUpdate = document.createElement("button");
  let btnDelete = document.createElement("button");
  btnUpdate.innerText = "Upgrade character";
  btnDelete.innerText = "Delete character";

  // Add click events, update open new tab and delete handle deletion
  btnUpdate.addEventListener("click", ()=>{
    // replace actual page with edit.html
    window.open(`./edit.html?id=${character.id}`, '_self');
  });
  btnDelete.addEventListener("click", () => {
    del(character.id);
  });
  // TODO apply sass updates when style.css is updated
  btnUpdate.classList.add("btn", "edit-btn");
  btnDelete.classList.add("btn", "edit-btn");
  btnDelete.id = "delete";

  // Remove Add character and see character buttons, add update and delete buttons
  let addCharacterButton = document.getElementsByClassName("card__button--addnew")[0];
  if(addCharacterButton) { document.body.removeChild(addCharacterButton); }
  let btnSee = clone.children[0].getElementsByClassName("card__button")[0];
  if(btnSee) { clone.children[0].removeChild(btnSee); }
  clone.children[0].appendChild(btnUpdate);
  clone.children[0].appendChild(btnDelete);

  // Add to target
  target.appendChild(clone);
  target.classList.remove("cardPool");
}

export { renderListCharacters, renderOneCharacter };