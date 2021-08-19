import { countCheckerName, countCheckerShort, countCheckerDescr } from "./inputChecker.js";
import { base64 } from "./previewFile.js";

const preparePost = () => {
  document.getElementById("save").addEventListener("click", async () => {
    const inputs = Array.from(document.querySelectorAll(".editor-input"));  
    const inputValues = inputs.map(({ value }) => value.trim());
    // Add base64 url at beginning of inputValues
    inputValues.unshift(base64);
  
    if (inputValues.some((value) => value === "")) {
      console.log(`you must fill all the forms!`);
      alert("you must fill all the forms!");
      return;
    }
    if ( countCheckerName || countCheckerShort || countCheckerDescr) {
      alert("Please do not exceed the number of characters allowed");
      return;
    }
    const [image, name, shortDescription, description] = inputValues;
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
      alert("Your character has been registered, you will be directed to the home page");
      window.open("../index.html", "_self");
    }
    catch(error) {
      console.error(error);
    }
  });
}

export { preparePost };