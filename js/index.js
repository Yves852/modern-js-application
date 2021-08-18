// Semaphore to control access to checkBarGet()
let researchRequestSemaphore = true;
const searchBar = document.getElementById("search-bar");
const target = document.getElementById("pool");
const template = document.getElementById("template");

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
