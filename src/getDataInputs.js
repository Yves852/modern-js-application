// Loop inputs and return an data object of their values
const getDataInputs = (inputs) => {
  let data = {};
  inputs.forEach((input) => {
    switch (input.id) {
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
};

export { getDataInputs };
