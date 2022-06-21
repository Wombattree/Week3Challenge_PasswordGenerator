var generateButton = document.getElementById("generatePasswordButton");
var passwordText = document.getElementById("passwordDisplay");

var minCharacters = 8;
var maxCharacters = 128;

function GeneratePassword()
{
  var validCharacters = [];

  var passwordLength = prompt("Please enter the desired password length\nMinimum " + minCharacters + ", maximum " + maxCharacters + ".")

  //Sanitise password length
  if (isNaN(passwordLength)) { PasswordIsNotANumber(); return null; }
  else if (passwordLength < minCharacters) { PasswordIsTheWrongSize(true); return null; }
  else if (passwordLength > maxCharacters) { PasswordIsTheWrongSize(false); return null; }

  //Ask for permission to use each type of charcter, then if permission is granted get all of that type of charcter and add it to the array of valid characters
  if (ConfirmationMessage("lower case letters"))
    GetAlphabeticalCharacters(true).forEach(element => { validCharacters.push(element) });
  if (ConfirmationMessage("upper case letters")) 
    GetAlphabeticalCharacters(false).forEach(element => { validCharacters.push(element) });
  if (ConfirmationMessage("numbers")) 
    GetNumericalCharacters().forEach(element => { validCharacters.push(element) });
  if (ConfirmationMessage("special characters"))
    GetSpecialCharacters().forEach(element => { validCharacters.push(element) });

  //Check if there are vaid characters, exit if there aren't
  if (validCharacters.length <= 0) { NoValidCharacters(); return null; }
  else
  {
    //Pick random characters from the vaid charcters array and add them to the password
    var password = "";
    for (let i = 0; i < passwordLength; i++) { password += GetCharacter(validCharacters); }
    return password;
  }
}

function ConfirmationMessage(messageText)
{
  return confirm("Should " + messageText + " be allowed in the password?");
}

function GetCharacter(characters)
{
  let value = Math.floor(Math.random() * characters.length);
  return characters[value];
}

function GetAlphabeticalCharacters(lowerCase)
{
  return [...Array(26)].map((num, i) => String.fromCharCode(i + (lowerCase ? 97 : 65)));
}

function GetNumericalCharacters()
{
  let num = [];
  for (let i = 0; i < 10; i++) { num.push(i); }
  return num;
}

function GetSpecialCharacters()
{
  return [...Array(15)].map((num, i) => String.fromCharCode(i + 33));
}

function NoValidCharacters()
{
  alert("You must enable at least one option.");
}

function PasswordIsNotANumber()
{
  alert("All I asked is that you type in a number and you couldn't even do that?\nGet it together.");
}

function PasswordIsTheWrongSize(tooSmall)
{
  var size = tooSmall ? "small" : "large";
  alert("The number you have entered was too " + size + ".\nThe password should be within " + minCharacters + " and " + maxCharacters + " characters.");
}

function WritePassword()
{
  var password = GeneratePassword();
  if (password != null) passwordText.value = password;
}

generateButton.addEventListener("click", WritePassword);