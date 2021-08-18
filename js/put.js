// Retrieve inut with image and transform it to an base 64 url
/* const imgFileToBase64Put = function (e) {    
  const preview = document.querySelector('.preview');
  const input = e.target;
  //const file = document.querySelector('#editor-character-name');
  const reader = new FileReader();
  let imgUrl64 = "";

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    imgUrl64 = reader.result;    
    preview.src = imgUrl64;
    // Add into character
    characterInput.image = imgUrl64.slice(21, imgUrl64.length);
  });

  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]);     
  }
} */
// When called from Update character, fill data from selected character and http method is PUT

const preparePut = async id => {
    const inputs = Array.from(document.querySelectorAll("input"));
    const image = document.getElementById("editor-character-name");
    
    if(id == "undefined") { throw new Error(`Cannot get id`); }

    // Refresh data from the character and fill inputs with its data
    
    characterInput = await getCharacter(id, null);
    
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
          // TODO image
          case "editor-character-name":
            image.src = `data:image/png;base64,${characterInput.image}`
            break;
        }
      });
    }// const values = inputvalues.unshift(base64);
    // imgFileToBase64(); // Prepare event to get url image from file when input file trigger
    document.getElementById('save').addEventListener('click', async () => {
        let dataCharacter = { "image": base64, ...getDataInputs(inputs) };
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