// Assignment Code
// element references/pointers
var generateBtn = document.querySelector("#generate");
// a list of vars that hold each preference
var passwordLength;
var specialPref;
var lowerCasePref;
var upperCasePref;
var numericPref;
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
  var prompts = displayPrompts();
  //  will return boolean; true if ALL VALID INPUT; or undefined for canceled prompts
  console.log(prompts + " prompt validity");

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
    passwordLength = prompt(
      "How many characters long do you want your password to be? (8-128)"
    );
    // if you press cancel, stop prompting
    if (passwordLength === null) {
      return;
    }
    passwordLength = parseInt(passwordLength); //convert to integer
    console.log(passwordLength + " length");
    if (validChecker(passwordLength)) {
      // tells us if we have valid input
      validInput = true;
    } else {
      // if we don't, while loop executes again and re-prompts
      alert("enter a number from 8-128");
    }
  }

  while (!pickPref) {
    // this while-loop controls a re-prompt;
    // need to pick at least one preference (or cancel) to break out of loop
    validInput = false; // we start false until proven true!!
    while (!validInput) {
      lowerCasePref = prompt(
        "Do you want to include LOWER CASE letters? (y or n)"
      );
      if (lowerCasePref === null) {
        //if you cancel, stop prompting
        return;
      }
      console.log(lowerCasePref + " lowercase");
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
      upperCasePref = prompt(
        "Do you want to include UPPER CASE letters? (y or n)"
      );
      if (upperCasePref === null) {
        return;
      }
      console.log(upperCasePref + " uppercase");
      if (validChecker(upperCasePref)) {
        validInput = true;
        if (upperCasePref == "y") {
          pickPref = true;
        } // true only when they picked a preference
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
      console.log(numericPref + " numeric");
      if (validChecker(numericPref)) {
        validInput = true;
        if (numericPref == "y") {
          pickPref = true;
        } // true only when they picked a preference
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
      console.log(specialPref + " special chars");
      if (validChecker(specialPref)) {
        validInput = true;
        if (specialPref == "y") {
          pickPref = true;
        } // true only when they picked a preference
      } else {
        alert("Enter y or n");
      }
    }
    // console.log("WE MADE IT");
    if (pickPref) {
      return true;
    }
    // console.log("WHERES MY ALERT");
    alert("You need to pick at least ONE character type preference!");
  }
  // passed all validity and prompt checks. now pass on info write the generator
  // console.log("WE MADE IT");
  // if (pickPref) {
  //   return true;
  // }
  // console.log("WHERES MY ALERT");
  // alert("You need to pick at least ONE character type preference!");
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
