/* generate password - help from codepen */
const firstResultEl = document.getElementById('first');
const secondResultEl = document.getElementById('second');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const messageEl = document.querySelector(".message");

const settings = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

const alphabeticChars = 26;
const numOfNumbers = 10;
const asciiOffset = {
    lowerCase: 97,
    upperCase: 65,
    numerical: 48
};


function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const settingsCount = lower + upper + number + symbol;
	const settingsArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(settingsCount === 0) {
		return 'Select Settings';
	}
	
	// create a loop
	for(let i = 0; i < length; i += settingsCount) {
		settingsArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += settings[funcName]();
		});
	}
	messageEl.textContent = "";
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

generateEl.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	firstResultEl.textContent = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    
	secondResultEl.textContent = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

/* function to get the specific chars for the password */
function getRandomLower() {
	return String.fromCharCode( Math.floor( Math.random() * alphabeticChars) + asciiOffset.lowerCase );
}

function getRandomUpper() {
	return String.fromCharCode( Math.floor(Math.random() * alphabeticChars) + asciiOffset.upperCase );
}

function getRandomNumber() {
	return +String.fromCharCode( Math.floor(Math.random() * numOfNumbers) + asciiOffset.numerical );
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.';
	return symbols[Math.floor( Math.random() * symbols.length )];
}

function copyToClipboard(id) {
	const textarea = document.createElement('textarea');
    let resultEl;
    
    if (id === 'first')
    {
        resultEl = firstResultEl;
    }
    else
    {
        resultEl = secondResultEl;
    }
    const password = resultEl.textContent;
	
	if (!password) {
        messageEl.style.color = 'red';
        messageEl.textContent = "Try to generate password first";
        return;
    }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
    messageEl.style.color = '#55F991';
	messageEl.textContent = "Password copied to clipboard";
}

/* Password Generating - Scrimba */
/*
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let passwordLength = 12

function getRandomCharacter() {
    let randomChar = Math.floor(Math.random() * characters.length)
    return characters[randomChar]
}

function generateRandomPassword() {
    let randomPassword = ""
    for (let i = 0; i < passwordLength; i++) {
        randomPassword += getRandomCharacter()         
    }
    return randomPassword
}
function suggestPwd() {
    document.getElementById("first").textContent = generateRandomPassword();
    document.getElementById("second").textContent = generateRandomPassword();
}
*/

/* Control of website Theme */
function applyTheme(theme) {
    document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
}

function applyIconTheme(theme) {
    const icon = document.querySelector(".fa");
    icon.classList.remove("fa-sun-o", "fa-moon-o");

    if (theme === "dark") {
        icon.classList.add("fa-moon-o");
    }
    else
    {
        icon.classList.add("fa-sun-o");
    }
}

// when document loaded
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "auto";

    applyTheme(savedTheme);
    applyIconTheme(savedTheme);


    // apply last selected theme on the theme options in website
    for (const optionElement of document.querySelectorAll("#selTheme option")) {
        optionElement.selected = savedTheme === optionElement.value;
    }

    // select the "selTheme" and when it changed run function that call
    // the applyTheme function whit the selected value
    document.querySelector("#selTheme").addEventListener("change", function () {
        applyIconTheme(this.value);
        // set current theme to local storage
        localStorage.setItem("theme", this.value);
        applyTheme(this.value);
    })
});




// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});