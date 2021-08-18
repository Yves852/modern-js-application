import { countCheckerName, countCheckerShort, countCheckerDescr } from "./inputChecker.js";

const preparePost = () => {
  document.getElementById("save").addEventListener("click", async () => {
    const inputs = Array.from(document.querySelectorAll(".editor-input"));  
    const inputvalues = inputs.map(({ value }) => value.trim());
    // Add base64 url at beginning of inputValues
    inputvalues.unshift(base64);
  
    if (inputvalues.some((value) => value === "")) {
      console.log(`you must fill all the forms!`);
      alert("you must fill all the forms!");
      return;
    }
    //if ((countChecker === true)) 
    if ( countCheckerName || countCheckerShort || countCheckerDescr) {
      alert("veuillez ne pas dépasser le nombre de caractères autorisés");
      return;
    }
    const [image, name, shortDescription, description] = inputvalues;
    try {
      const response = await fetch(
        "https://character-database.becode.xyz/characters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            shortDescription,
            name,
            image,
          }),
        }
      );
      const newcharacter = await response.json();    
      alert(
        "Votre Personnage a bien été enregistré, vous allez être dirigé vers la page d'accueil"
      );
      window.open("../index.html", "_self");
    }
    catch(error) {
      console.error(error);
    }
  });
}

export { preparePost };