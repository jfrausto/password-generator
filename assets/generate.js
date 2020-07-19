// Assignment Code
// element references/pointers
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // begin series of prompts
  var prompts = displayPrompts(); //  will return boolean; true if ALL good INPUT; or undefined for canceled prompts
  console.log(prompts);

  // if we did NOT CANCEL at any point, then generate the password!
  if (!(prompts === undefined)) {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
  }
}

function displayPrompts() {
  var validInput = false; // initialize validInput flag to traverse multiple while loops
  // while loop for password length
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

    if (validLengthChecker(passwordLength)) {
      // tells us if we have valid input
      validInput = true; // if we don't, while loop executes again and re-prompts
    } else {
      alert("enter a number from 8-128");
    }
  }

  //   another while loop here for next valid check
}

// function to check validity of length
function validLengthChecker(good) {
  if (good >= 8 && good <= 128) {
    return true; // returns true for good input
  } else return false;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
