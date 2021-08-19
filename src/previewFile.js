let base64 = "";

// Retrieve inut with image and transform it to an base 64 url
const previewFile = () => {
  const preview = document.getElementById("image-preview");
  const file = document.getElementById("image-input").files[0];
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

export { base64, previewFile };