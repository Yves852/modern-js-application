// import _ from "lodash";
import { displayCharacters } from "./displayCharacters.js";
import { prepareEdit } from "./edit.js";

// Semaphore to control access to checkBarGet()
let researchRequestSemaphore = true;
const searchBar = document.getElementById("search-bar");

// When triggered, check if the searched string is > 2 of empty to make a get request
const checkBarGet = () => {
  if (searchBar.value.length > 2) {
    displayCharacters(searchBar.value);
  } else if (searchBar.value.length == 0) {
    displayCharacters();
  }
};

(() => {
  if (
    window.location.pathname == "/" ||
    window.location.pathname == "/index.html"
  ) {
    // On load, fill the pool section with cards from characters
    displayCharacters();
    // When release key on the search bar, make a research if none already launch within 500 ms
    // researchRequestSemaphore control the access to the function, so it cannot be triggered more than
    // one time every 500 ms and prevent API to die of requests
    searchBar.value = "";
    searchBar.addEventListener("keyup", async () => {
      if (researchRequestSemaphore) {
        researchRequestSemaphore = false;
        setTimeout(checkBarGet, 500);
        researchRequestSemaphore = true;
      }
    });
    // Add button onclick, open edit page to post a new character
    document.getElementById("addBtn").addEventListener("click", () => {
      window.open("./edit.html", "_self");
    });
  } else if (window.location.pathname == "/edit.html") {
    prepareEdit();
  } else console.error("unknow path", window.location.pathname);
})();
