import getCharacter from "get.js";
import { countCheckerName, countCheckerShort, countCheckerDescr } from "inputChecker.js";

const preparePut = async id => {
    let characterInput;
    const inputs = Array.from(document.querySelectorAll("input"));
    const image = document.getElementById("editor-character-name");
    
    if(id == "undefined") { throw new Error(`Cannot get id`); }

    // Refresh data from the character and fill inputs with its data    
    characterInput = await getCharacter(id, null);
    // Loop on inputs to refresh their contents
    if (characterInput){
      inputs.forEach(input => {
        switch(input.id){
          case "editor-character-name":
            input.value = characterInput.name;
            break;
          case "editor-character-short":
            input.value = characterInput.shortDescription;
            break;
          case "editor-character-description":
            input.value = characterInput.description;
            break;
          case "editor-character-name":
            image.src = `data:image/png;base64,${characterInput.image}`
            break;
        }
      });
    }

    document.getElementById('save').addEventListener('click', async () => {
        let dataCharacter = { "image": base64, ...getDataInputs(inputs) };
        // Check if nothing missing and characters limits 
        if (inputvalues.some((value) => value === "")) {
          console.log(`you must fill all the forms!`);
          alert("you must fill all the forms!");
          return;
        }
        if ( countCheckerName || countCheckerShort || countCheckerDescr ) {
          alert("veuillez ne pas dépasser le nombre de caractères autorisés");
          return;
        }

        try {
          const response = await fetch(`https://character-database.becode.xyz/characters/${id}`,{
              method: "PUT",
              headers:{
                  "Content-Type":"application/json",
              },
              body: JSON.stringify(dataCharacter)
          });
          window.open(`../index.html?id=${id}`, '_self');
        }
        catch(error) {
          console.error(error);
        }
    });
}

export { preparePut };