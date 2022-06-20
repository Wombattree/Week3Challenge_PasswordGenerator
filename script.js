var generateButton = document.getElementById("generatePasswordButton");
var passwordText = document.getElementById("passwordDisplay");

var passwordLengthSlider = document.getElementById("passwordLengthSlider");
var isLowerCaseValidButton = document.getElementById("isLowerCaseValid");
var isUpperCaseVaidButton = document.getElementById("isUpperCaseValid");
var areNumbersValidButton = document.getElementById("areNumbersValid");
var areSpecialValidButton = document.getElementById("areSpecialValid");

var lowerCaseCharcters = GetLowerCaseCharacters();
var upperCaseCharacters = GetUpperCaseCharacters();
var numberCharacters = GetNumberCharacters();
var specialCharacters = GetSpecialCharacters();

function GeneratePassword()
{
  var validCharacters = [];

  if (isLowerCaseValidButton.checked) {for (const element of lowerCaseCharcters) validCharacters.push(element);}
  if (isUpperCaseVaidButton.checked) {for (const element of upperCaseCharacters) validCharacters.push(element);}
  if (areNumbersValidButton.checked) {for (const element of numberCharacters) validCharacters.push(element);}
  if (areSpecialValidButton.checked) {for (const element of specialCharacters) validCharacters.push(element);}

  if (validCharacters.length > 0)
  {
    var password = "";
  
    for (let i = 0; i < passwordLengthSlider.value; i++) 
    {
      password += GetCharacter(validCharacters);
    }
  
    return password;
  }
  else
  {
    NoValidCharacters();
    return null;
  }
}

function GetCharacter(characters)
{
  let value = Math.floor(Math.random() * characters.length);
  return characters[value];
}

function GetLowerCaseCharacters()
{
  return [...Array(26)].map((num, i) => String.fromCharCode(i + 97));
}

function GetUpperCaseCharacters()
{
  return [...Array(26)].map((num, i) => String.fromCharCode(i + 65));
}

function GetNumberCharacters()
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
  console.log("You must enable at least one option");
}

function WritePassword()
{
  var password = GeneratePassword();
  if (password != null) passwordText.value = password;
}

generateButton.addEventListener("click", WritePassword);
