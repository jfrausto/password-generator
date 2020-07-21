# Password Generator

This is an application that generates a random password based on user-selected preferences. It runs completely on the browser and features dynamically updated HTML and CSS driven by `generate.js`. After the user selects their preferences, the password will appear in a clean no-frills user interface that adapts to various screen sizes.

![Password prompt](/assets/images/password_gen_prompt_clean.png?raw=true "A Password Prompt")

This application takes in 5 criteria from the user to create the password:

1. Password length
1. Lower case letters
1. Upper case letters
1. Numbers
1. Special characters

Upon clicking the generate button, the first prompt receives, validates, and stores the user desired length of password. The rest of the prompts are a series of yes or no questions that ask the user's preference of characters to include. Users enter either a `"y"` or `"n"` to denote their choice and sends an alert if the input is not either a yes or no. Further, at least one of the 4 character types must be chosen. If not, the user is re-prompted to choose a character type. The user can also choose to _cancel_ password generation at any time. When the prompts are finished, a password is generated in the `readonly` text area.

![Password generated](/assets/images/password_gen_result.png?raw=true "Example of a random password")

To generate a password like this, the javascript uses a few functions, arrays, and loops to string it together. `writePassword()` is called with an event listener on the button to activate the script. After `displayPrompts()` returns true after calling a series of `validChecker()` for correct and valid input, we are allowed to call `generatePassword()`. Within, we call `buildPool()` to take the empty master array and concatenate arrays to build the pool of characters the user prefers. Then, we use a loop to string together a password. The loop concatenates an empty string with a randomly selected character from the index of the user-defined master array for each iteration until we reach a desired password length. We call `getRandomIntInclusive(min, max)` (from MDN Docs) to help us pick a random number from the range of the first index `[0]` to the last index of `[masterArray.length-1]`. The resulting string contains random characters at the specified length. The `<textarea>` element then gets updated to display the result!
