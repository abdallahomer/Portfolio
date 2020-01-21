// inputs
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
// Form
const form = document.getElementById("myForm");
// Validation colors
const green = "#4CAF50";
const red = "#F44336";
// Handle form
form.addEventListener("submit", function(event) {
  // Prevent default behaviour
  if (validateName() && validateEmail() && validateMessage()) {
    form.setAttribute(
      "action",
      "https://formspree.io/abdallah.android2014@gmail.com"
    );
    form.setAttribute("method", "POST");
    form.submit();
  } else {
    event.preventDefault();
    return false;
  }
});

// Validators
function validateName() {
  // check if is empty
  if (checkIfEmpty(name)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(name)) return;
  return true;
}
function validatePhone() {
  if (checkIfEmpty(phone)) return;
  if (!containOnlyNumbers(phone)) return;
  return true;
}
function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email, 5)) return;
  return true;
}
function validateMessage() {
  if (checkIfEmpty(message)) return;
  return true;
}
// Utility functions
function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    // set field invalid
    setInvalid(field, `${field.name} should not be empty`);
    return true;
  } else {
    // set field valid
    setValid(field);
    return false;
  }
}
function isEmpty(value) {
  if (value === "") return true;
  return false;
}
function setInvalid(field, message) {
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}
function setValid(field) {
  field.nextElementSibling.innerHTML = "";
}
function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} should contain only letters`);
    return false;
  }
}
function containOnlyNumbers(field) {
  if (/^[0-9]*$/gm.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} should contain only numbers`);
    return false;
  }
}

function containsCharacters(field, code) {
  let regEx;
  switch (code) {
    case 1:
      // letters
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, "Must contain at least one letter");
    case 2:
      // letter and numbers
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one letter and one number"
      );
    case 3:
      // uppercase, lowercase and number
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one uppercase, one lowercase letter and one number"
      );
    case 4:
      // uppercase, lowercase, number and special char
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one uppercase, one lowercase letter, one number and one special character"
      );
    case 5:
      // Email pattern
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(regEx, field, "Please enter a valid email address");
    default:
      return false;
  }
}
function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}
