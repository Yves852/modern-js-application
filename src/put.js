import { getCharacter } from "./get.js";
import { countCheckerName, countCheckerShort, countCheckerDescr } from "./inputChecker.js";
import { base64, previewFile } from "./previewFile.js";
import { getDataInputs } from "./getDataInputs.js";

const preparePut = async id => {
    let characterData;
    const inputs = Array.from(document.querySelectorAll("input"));
    // Remove image-input as it doesn't have value and cannot be checked
    let indexImgInput = inputs.indexOf(document.getElementById('image-input'));
    if (indexImgInput > -1) {
      inputs.splice(indexImgInput, 1);
    }
    const image = document.getElementById("image-preview");
    
    if(id == "undefined") { throw new Error(`Cannot get id`); }

    // Refresh data from the character and fill inputs with its data    
    characterData = await getCharacter(id, null);
    // Loop on inputs to refresh their contents
    if (characterData){
      inputs.forEach(input => {
        switch(input.id){
          case "editor-character-name":
            input.value = characterData.name;
            break;
          case "editor-character-short":
            input.value = characterData.shortDescription;
            break;
          case "editor-character-description":
            input.value = characterData.description;
            break;
        }
      });
      if(characterData.image){ image.src = `data:image/png;base64,${characterData.image}`; }
    }

    document.getElementById('save').addEventListener('click', async () => {
      let inputValues = inputs.map(({ value }) => value.trim());
      if(base64 == "") { base64 = image.src.split(",")[1]; }
      let dataCharacter = { "image": base64, ...getDataInputs(inputs) };
      // Check if nothing missing and characters limits 
      if (inputValues.some((value) => value === "")) {
        alert("you must fill all the forms!");
        return;
      }
      if ( countCheckerName || countCheckerShort || countCheckerDescr ) {
        alert("Please do not exceed the number of characters allowed");
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
        window.open(`./index.html?id=${id}`, '_self');
      }
      catch(error) {
        console.error(error);
      }
  });
}

export { preparePut };