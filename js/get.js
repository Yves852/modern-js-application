/* Get character from ID or name, or retrieve all */
const getCharacter = async (id, name) => {
  // Check if on and only one of teh two parameters is filled and make param accordingly
  // Name taken as filter to get several matching characters
  // Id to get a single character
  // Else get all characters
  let param = "";
  if(id && (!name || name.length < 1)){
    param = id;
  }
  else if((!id || id.length < 1) && name){
    param = `?name=${name}`;
  }

  try {
    //const myHeaders = new Headers();
    let result = await window.fetch(`https://character-database.becode.xyz/characters/${param}`, { 
      method: "GET",
      //headers: myHeaders
    });
    if(!result.ok){ throw new Error( `${result.status} ${result.statusText}`); }
    let characters = await result.json();
    return  characters;
  }
  catch(error) {
      console.error(error);
    }
}