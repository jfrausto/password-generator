// Assignment Code
// element references/pointers
var generateBtn = document.querySelector("#generate");
// maybe a list of vars that hold each preference

// i think we are going to need a MASTER array containing everything we can randomize from.

var masterArray = []; // holds the array of characters we can pick random from, according to preference

var lowerAlphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
// or we could add an UPPERCASE array, if we don't want to deal with .toUpperCase()
// could still have a for loop with toUppercase()
var numerical = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// maybe easier to make these into strings not numbers
var specialChars = [
  " ",
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "?",
  "@",
  "[",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
];

// Write password to the #password input
function writePassword() {
  // begin series of prompts
  var prompts = displayPrompts(); //  will return boolean; true if ALL good INPUT; or undefined for canceled prompts
  console.log(prompts);

  // if we did NOT CANCEL at any point, then generate the password!
  if (!(prompts === undefined)) {
    var password = generatePassword();
    var passwordText = document.querySelector("#password"); // textarea element reference

    passwordText.value = password;
  }
  //  could display something here to say, "NVM no password then..." with an ELSE
}

function displayPrompts() {
  var validInput = false; // initialize validInput flag to traverse multiple while loops
  var pickPref = false; //  have not picked (0) preferences so far, we will need at least one!
  // while-loop for password length
  while (!validInput) {
    // ask for password length
    var passwordLength = prompt(
      "How many characters long do you want your password to be? (8-128)"
    );

    // if you press cancel, stop prompting
    if (passwordLength === null) {
      return;
    }
    passwordLength = parseInt(passwordLength); //convert to integer
    console.log(passwordLength);
    if (validChecker(passwordLength)) {
      // tells us if we have valid input
      validInput = true;
    } else {
      // if we don't, while loop executes again and re-prompts
      alert("enter a number from 8-128");
    }
  }
  //   another while loop here for next valid check
  //   REMEMBER WE NEED TO PICK AT LEAST ONE PREFERENCE!
  validInput = false; // we start false until proven true!!
  while (!validInput) {
    var lowerCasePref = prompt(
      "Do you want to include lower case letters? (y or n)"
    );
    if (lowerCasePref === null) {
      //if you cancel, stop prompting
      return;
    }
    console.log(lowerCasePref);
    if (validChecker(lowerCasePref)) {
      // check valid input
      validInput = true;
      if (lowerCasePref == "y") {
        pickPref = true; // true only when they picked a preference
      }
    } else {
      alert("Enter y or n");
    }
  }
  // next prompt, next while loop
  validInput = false;
  while (!validInput) {
    var upperCasePref = prompt(
      "Do you want to include upper case letters? (y or n)"
    );
    if (upperCasePref === null) {
      return;
    }
    console.log(upperCasePref);
    if (validChecker(upperCasePref)) {
      validInput = true;
      if (lowerCasePref == "y") {
        pickPref = true;
      } // true only when they picked a preference
    } else {
      alert("Enter y or n");
    }
  }
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

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
