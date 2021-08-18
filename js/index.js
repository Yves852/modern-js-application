// Semaphore to control access to checkBarGet()
let researchRequestSemaphore = true;
// Handle search bar actions
const searchBar = document.getElementById("search-bar");
const target = document.querySelector("#pool");
const template = document.getElementById("template");

// Take a list of character and render on screen
const renderListCharacters = characters => {
  // Check if target has class cardPool and add it
  if(!target.classList.contains("cardPool")) { target.classList.add("cardPool"); }
  // Loop on characters, create cards and add them to target
  characters.forEach((character) => {
    let clone = template.content.cloneNode(true);
    clone.querySelector(".card__button").addEventListener("click", ()=>{
      // Onclick, Open a new tab of index.html with the character id as parameter
      window.open(`index.html?id=${character.id}`, '_blank');
    });
    clone.querySelector(".card__img").src = `data:image/png;base64,${character.image}`;
    clone.querySelector(".card__h3").innerHTML = character.name;
    clone.querySelector(".card__p").innerHTML = character.shortDescription;
    target.appendChild(clone);
  });
}

// Take ont character and render on screen
const renderOneCharacter = character => {
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
    window.open(`./html/edit.html?id=${character.id}`, '_self');
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

/* Function creating cards from template and filling with data */
const displayCharacters = async name => {
  // Check if an id is sent in url or a name by paramerer and use it on getCharacter
  const params = new URLSearchParams(window.location.search);
  const idUrl = params.get("id");
  let nameParam = name ? name : "";
  const characters = idUrl 
    ? await getCharacter(idUrl, null) 
    : nameParam.length > 0 
      ? await getCharacter(null, nameParam) 
      : await getCharacter(null, null);
  
  // Check if target have already elements, empty it if so
  if(target.children && target.children.length > 0) { 
    while(target.lastChild) { target.removeChild(target.lastChild); }; 
  }

  // If receive an array of multiple characters, loop on it and display and prepare buttons
  // Else display the unique character card with adapted style and buttons
  if(characters[0] != undefined && characters.length > 0){
    renderListCharacters(characters);
  }
  else if(characters.id) {
    renderOneCharacter(characters);
  }
}

// When triggered, check if the searched string is > 2 of empty to make a get request
const checkBarGet = ()=>{
  if(searchBar.value.length > 2) { displayCharacters(searchBar.value); }
  else if(searchBar.value.length == 0) { displayCharacters(); }
}

(() => {
  // On load, fill the pool section with cards from characters
  displayCharacters();
  // Empty bar at load
  searchBar.value = "";
  // When release key on the search bar, make a research if none already launch within 500 ms
  // researchRequestSemaphore control the access to the function, so it cannot be triggered more than 
  // one time every 500 ms and prevent API to die of requests
  searchBar.addEventListener("keyup", async ()=>{
    if(researchRequestSemaphore) {
      researchRequestSemaphore = false;      
      setTimeout(checkBarGet, 500);
      researchRequestSemaphore = true;
    }
  });
  // Add button onclick, open edit page to post a new character
  document.getElementById('addBtn').addEventListener("click", () => {
    window.open('./html/edit.html', "_self")
  });
})();
