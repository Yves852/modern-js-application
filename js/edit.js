let characterInput;
let base64 = "";

// Retrieve inut with image and transform it to an base 64 url
const imgFileToBase64 = function (e) {    
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
    characterInput.image = imgUrl64.split(",")[1]; //.slice(21, imgUrl64.length);
  });

  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]);     
  }
}

function previewFile() {
  const preview = document.querySelector("img");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string

      preview.src = reader.result;
      base64 = reader.result.split(",")[1];
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

const getDataInputs = inputs => {
  let data = {};
  inputs.forEach(input => {
    switch(input.id){
      case "editor-character-name":
        data.name = input.value;
        break;
      case "editor-character-short":
        data.shortDescription = input.value;
        break;
      case "editor-character-description":
        data.description = input.value;
        break;
    }
  });
  // data.image is handled in put.js and post.js
  return data;
}


// From post to edit
document.getElementById('uploadImage').addEventListener('click', ()=>{
  document.querySelector("input[type=file").click()
})

countChecker = "";
const txt = document.querySelectorAll(".editor-input");
const nameChecker = (value) => {
  document.getElementById(
    "name-count"
  ).innerHTML = `${value.length} on max 20 char.`;
  if (value.length > 20) {
    document.getElementById("name-count").style.color = "red";
    countChecker = true;
  } else {
    document.getElementById("name-count").style.color = "white";
    countChecker = false;
  }
};

const shortchecker = (value) => {
  document.getElementById(
    "short-count"
  ).innerHTML = `${value.length} on max 70 char.`;
  if (value.length > 70) {
    document.getElementById("short-count").style.color = "red";
    countChecker = true;
  } else {
    document.getElementById("short-count").style.color = "white";
    countChecker = false;
  }
};
const descriptionChecker = (value) => {
  document.getElementById(
    "desc-count"
  ).innerHTML = `${value.length} on max 350 char.`;
  if (value.length > 350) {
    document.getElementById("desc-count").style.color = "red";
    countChecker = true;
  } else {
    document.getElementById("desc-count").style.color = "white";
    countChecker = false;
  }
};

txt.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "editor-character-name":
        nameChecker(e.target.value);
        break;
      case "editor-character-short":
        shortchecker(e.target.value);
        break;
      case "editor-character-description":
        descriptionChecker(e.target.value);
        break;
    }
  });
});
//

// 
let idUrl;

(() => {
  // Check if an id is sent in url and use it
  const params = new URLSearchParams(window.location.search);
  idUrl = params.get("id");

  // If an id is retrieved, use put to update character
  // Else post to create a new character
  if(idUrl){
    preparePut(idUrl);   // post.js
  }
  else {
    preparePost();  // put.js
  }
})();