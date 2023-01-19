const toConvertInp = document.querySelector("#convert-inp");
const convertBtn = document.querySelector("#convert-btn");

const lengthSection = document.querySelector("#length");
const volumeSection = document.querySelector("#volume");
const massSection = document.querySelector("#mass");

let currentValue = 1;

const meter = 3.281;
const liter = 0.264;
const kilogram = 2.204;

if (localStorage.getItem("last-value") === null) {
    toConvertInp.value = currentValue;
}
else {
    updateValue();
}

function updateValue() {
    currentValue = getValue();
    toConvertInp.value = currentValue;

    updateLength();
    updateMass();
    updateVolume();
}

function getValue() {
    return localStorage.getItem("last-value");
}

convertBtn.addEventListener("click", () => {
    // Gets input value
    let new_value = toConvertInp.value;

    // Saves data to retrieve later
    localStorage.setItem("last-value", new_value);

    // Updates HTML
    updateValue();
});

function updateLength() {
    let feet = (currentValue * meter).toFixed(3);
    let meters = (currentValue / meter).toFixed(3);

    lengthSection.innerHTML = `
        <h1>Length (Meter/Feet)</h1>
        <p>${currentValue} meters = ${feet} feet | ${currentValue} feet = ${meters} meters</p>
    `;
}

function updateVolume() {
    let gallons = (currentValue * liter).toFixed(3);
    let liters = (currentValue / liter).toFixed(3);

    volumeSection.innerHTML = `
        <h1>Volume (Liters/Gallons)</h1>
        <p>${currentValue} liters = ${gallons} gallons | ${currentValue} gallons = ${liters} meters</p>
    `;
}

function updateMass() {
    let Pounds = (currentValue * kilogram).toFixed(3);
    let kilos = (currentValue / kilogram).toFixed(3);

    massSection.innerHTML = `
        <h1>Mass (Kilograms/Pounds)</h1>
        <p>${currentValue} kilos = ${Pounds} Pounds | ${currentValue} Pounds = ${kilos} kilos</p>
    `;
}



/* -------------------------------------------------------------------------- */
/*                                    THEME                                   */
/* -------------------------------------------------------------------------- */
const containerEl = document.querySelector(".container");
const convertedEl = document.querySelectorAll(".converted");

function applyConvertedDarkTheme(theme) {
    containerEl.classList.remove("theme-auto", "theme-light", "theme-dark");
    containerEl.classList.add(`theme-${theme}`);

    for (let i = 0; i < convertedEl.length; i++) {
        const element = convertedEl[i];
        
        element.classList.remove("theme-auto", "theme-light", "theme-dark");
        element.classList.add(`theme-${theme}`);
    }
}

function applyTheme(theme) {
    document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);

    applyConvertedDarkTheme(theme);
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




/* -------------------------------------------------------------------------- */
/*                               SOCIAL PANEL JS                              */
/* -------------------------------------------------------------------------- */
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});