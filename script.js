var generateButton = document.getElementById("generatePasswordButton");
var passwordText = document.getElementById("passwordDisplay");

var lowerCaseCharcters = GetAlphabeticalCharacters(true);
var upperCaseCharacters = GetAlphabeticalCharacters(false);
var numberCharacters = GetNumericalCharacters();
var specialCharacters = GetSpecialCharacters();

function GeneratePassword()
{
  var validCharacters = [];

  var passwordLength = prompt("Please enter the desired password length\nMinimum 8, maximum 128")

  if (passwordLength < 8) { PasswordIsTheWrongSize(true); return null; }
  else if (passwordLength > 128) { PasswordIsTheWrongSize(false); return null; }

  var areLowerCaseValid = confirm("Should lower case letters be allowed in the password");
  var areUpperCaseValid = confirm("Should upper case letters be allowed in the password");
  var areNumberValid = confirm("Should numbers be allowed in the password");
  var areSpecialValid = confirm("Should special characters be allowed in the password");

  if (areLowerCaseValid) {for (const element of lowerCaseCharcters) validCharacters.push(element);}
  if (areUpperCaseValid) {for (const element of upperCaseCharacters) validCharacters.push(element);}
  if (areNumberValid) {for (const element of numberCharacters) validCharacters.push(element);}
  if (areSpecialValid) {for (const element of specialCharacters) validCharacters.push(element);}

  if (validCharacters.length <= 0) { NoValidCharacters(); return null; }
  else
  {
    var password = "";

    for (let i = 0; i < passwordLength; i++)
    {
      password += GetCharacter(validCharacters);
    }
  
    return password;
  }
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
  alert("You must enable at least one option");
}

function PasswordIsTheWrongSize(tooSmall)
{
  var size = tooSmall ? "small" : "large";
  alert("The number you have entered was too " + size + ".\nThe password should be within 8 and 128 characters.");
}

function WritePassword()
{
  var password = GeneratePassword();
  if (password != null) passwordText.value = password;
}

generateButton.addEventListener("click", WritePassword);