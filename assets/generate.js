// button element reference object
var generateBtn = document.querySelector("#generate");
// a list of vars that hold each preference
var passwordLength; //  user defined length of password
var specialPref; //  special character choice
var lowerCasePref; //  lower case letters choice
var upperCasePref; //  upper case letters choice
var numericPref; //  include numbers choice
var masterArray = []; // holds the array of characters we can pick random from, according to preference
var lowerAlphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m",
                    "n","o","p","q","r","s","t","u","v","w","x","y","z",];
var numerical = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialChars = ["!",'"',"#","$","%","&","'","-",".","/",":",";","<",
                    "?","@","[","]","^","_","`","{","}","~",];

// Write password to the #password text area
function writePassword() {
  // if wants to generate new password, reset master array to empty
  masterArray = [];
  passwordLength = 0;
  // begin series of prompts
  //  will return boolean; true if ALL VALID INPUT; or undefined for canceled prompts
  var prompts = displayPrompts();
  // if we did NOT CANCEL at any point, then generate the password!
  if (!(prompts === undefined)) {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
    passwordText.value = password; // assign the password to the elements value to display
  } else {
    //generation was canceled
    alert("Canceled password generator!");
  }
}

//  this function contains while-loops to re-prompt the user in cases of bad input
function displayPrompts() {
  var validInput = false; // initialize validInput flag to traverse multiple while loops
  var pickPref = false; //  have not picked preferences so far, we will need at least one!
  // while-loop for password length
  while (!validInput) {
    // ask for password length
    passwordLength = prompt(
      "How many characters long do you want your password to be? (8-128)"
    );
    // if you press cancel, stop prompting
    if (passwordLength === null) {
      return;
    }
    passwordLength = parseInt(passwordLength); //convert to integer
    // check for integer
    if (validChecker(passwordLength)) {
      // tells us if we have valid input
      validInput = true;
    } else {
      // if we don't, while loop executes again and re-prompts
      alert("Enter a number from 8-128");
    }
  }

  while (!pickPref) {
    // this while-loop controls a re-prompt;
    // need to pick at least one preference (or cancel) to break out of loop
    validInput = false; // we start always start false until proven true!
    // "character type" prompt
    while (!validInput) {
      lowerCasePref = prompt(
        "Do you want to include LOWER CASE letters? (y or n)"
      );
      if (lowerCasePref === null) {
        // if you press cancel, stop prompting
        return;
      }
      if (validChecker(lowerCasePref)) {
        // check valid input
        validInput = true;
        if (lowerCasePref == "y") {
          pickPref = true; // "picked a preference" flag
        }
      } else {
        alert("Enter y or n");
      }
    }
    // next character type prompt
    validInput = false;
    while (!validInput) {
      upperCasePref = prompt(
        "Do you want to include UPPER CASE letters? (y or n)"
      );
      if (upperCasePref === null) {
        return;
      }
      if (validChecker(upperCasePref)) {
        validInput = true;
        if (upperCasePref == "y") {
          pickPref = true;
        } // "picked a preference" flag
      } else {
        alert("Enter y or n");
      }
    }
    // next prompt, next while loop
    validInput = false;
    while (!validInput) {
      numericPref = prompt("Do you want to include NUMBERS? (y or n)");
      if (numericPref === null) {
        // returns if canceled.
        return;
      }
      if (validChecker(numericPref)) {
        validInput = true;
        if (numericPref == "y") {
          pickPref = true;
        } // "picked a preference" flag
      } else {
        alert("Enter y or n");
      }
    }
    // next prompt, next while loop
    validInput = false;
    while (!validInput) {
      specialPref = prompt(
        "Do you want to include SPECIAL CHARACTERS? (y or n)"
      );
      if (specialPref === null) {
        // returns if canceled.
        return;
      }
      if (validChecker(specialPref)) {
        validInput = true;
        if (specialPref == "y") {
          pickPref = true;
        } // "picked a preference" flag
      } else {
        alert("Enter y or n");
      }
    }
    if (pickPref) {
      // if user picked at least one, return knowing you have valid input
      return true;
    } // else, user is alerted and re-prompted
    alert("You need to pick at least ONE character type preference!");
  }
}
// THIS FUNCTION WAS TAKEN FROM JAVASCRIPT MDN DOCS
// (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The min and max values are inclusive
}

function generatePassword() {
  // returns a password string

  var userPool = buildPool(); //  build the preferred pool of characters array
  var result = ""; // start with an empty string
  // append the empty string at each iteration with a randomly generated index in the userPool[]
  for (var j = 0; j < passwordLength; j++) {
    result = result + userPool[getRandomIntInclusive(0, userPool.length - 1)];
  }
  return result;
}

function buildPool() {
  // build user defined pool of characters dynamically
  // by concatenating an empty array with if-checks.
  if (lowerCasePref === "y") {
    masterArray = masterArray.concat(lowerAlphabet);
  }
  if (upperCasePref === "y") {
    // loop through lowercase alphabet and convert to upper case
    var upperAlphabet = [];
    for (var i = 0; i < lowerAlphabet.length; i++) {
      upperAlphabet.push(lowerAlphabet[i].toUpperCase());
    }
    masterArray = masterArray.concat(upperAlphabet);
  }
  if (numericPref === "y") {
    masterArray = masterArray.concat(numerical);
  }
  if (specialPref === "y") {
    masterArray = masterArray.concat(specialChars);
  }
  return masterArray; // returns custom built array
}

// function to check validity of length; or yes or no prompts.
function validChecker(good) {
  if (typeof good == "number") {
    // check if we received an integer or string.
    if (good >= 8 && good <= 128) {
      return true; // returns true for good input
    } else return false;
  } else {
    // received a string for (y or n) responses
    if (good == "y" || good == "n") {
      return true; // good input if only (y or n)
    } else return false;
  }
}

// Add event listener to generate button; activates entire script
generateBtn.addEventListener("click", writePassword);
