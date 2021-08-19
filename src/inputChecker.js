// Booleans, false if no test failed
let countCheckerName = true;
let countCheckerShort = true;
let countCheckerDescr = true;
const txt = document.querySelectorAll(".editor-input");

const nameChecker = (value) => {
  document.getElementById(
    "name-count"
  ).innerHTML = `${value.length} on max 20 char.`;
  if (value.length > 20) {
    document.getElementById("name-count").style.color = "red";
    countCheckerName = true;
  } else {
    document.getElementById("name-count").style.color = "white";
    countCheckerName = false;
  }
};

const shortchecker = (value) => {
  document.getElementById(
    "short-count"
  ).innerHTML = `${value.length} on max 70 char.`;
  if (value.length > 70) {
    document.getElementById("short-count").style.color = "red";
    countCheckerShort = true;
  } else {
    document.getElementById("short-count").style.color = "white";
    countCheckerShort = false;
  }
};

const descriptionChecker = (value) => {
  document.getElementById(
    "desc-count"
  ).innerHTML = `${value.length} on max 350 char.`;
  if (value.length > 350) {
    document.getElementById("desc-count").style.color = "red";
    countCheckerDescr = true;
  } else {
    document.getElementById("desc-count").style.color = "white";
    countCheckerDescr = false;
  }
};

const addCheckAtInputEvent = () => {
  // Add event on inputs update to trigger checking
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
};

export {
  countCheckerName,
  countCheckerShort,
  countCheckerDescr,
  addCheckAtInputEvent,
};
