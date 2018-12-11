/* JavaScript */

// Variables to keep track of
let dinos = 0;
let scales = 0;
let dps = 0;
let sps = 0;

// Get references to specific nodes to adjust and append to
let buyablesParentNode = document.querySelector("#buyables-parent");
let dinoNode = document.querySelector("#dino-info").querySelector(".play-stat");
let scalesNode = document.querySelector("#scale-info").querySelector(".play-stat");
let dpsNode = document.querySelector("#dps-info").querySelector(".play-stat");
let spsNode = document.querySelector("#sps-info").querySelector(".play-stat");
let clickerNode = document.querySelector("#create-dino");

// Create the default dino farm
createNewBuyableEntry("Dino Farm", 10, 0, 1, 2);

// Set up event listener for the clickable dino creation button
clickerNode.addEventListener("click", addDinos);

// Set up default buyables container
function createNewBuyableEntry(name, dinoCost, scaleCost, dps, sps){
    // Create all HTML sections and set their properties
    let buyablesIndividual = document.createElement("div");
    buyablesIndividual.className = "buyables-individual";
    buyablesIndividual.setAttribute("data-dCost", dinoCost);
    buyablesIndividual.setAttribute("data-sCost", scaleCost);
    buyablesIndividual.setAttribute("data-dBenefit", dps);
    buyablesIndividual.setAttribute("data-sBenefit", sps);
    buyablesIndividual.addEventListener("click", addDPS);
    console.log(buyablesIndividual);

    let buyablesTitle = document.createElement("h1");
    buyablesTitle.innerHTML = name;
    buyablesTitle.className = "buyables-title";

    let buyablesCosts = document.createElement("div");
    buyablesCosts.className = "buyables-costs";

    let dCost = document.createElement("p");
    dCost.innerHTML = `-${dinoCost} Dinos`;
    dCost.className = "cost";

    let sCost = document.createElement("p");
    sCost.innerHTML = `-${scaleCost} Scales`;
    sCost.className = "cost";

    let dBenefit = document.createElement("p");
    dBenefit.innerHTML = `+${dps} DPS`;
    dBenefit.className = "benefit";

    let sBenefit = document.createElement("p");
    sBenefit.innerHTML = `+${sps} SPS`;
    sBenefit.className = "benefit";

    // Create an event listener for the div to add dinos based on click

    // Append all HTML sections together
    buyablesCosts.appendChild(dCost);
    buyablesCosts.appendChild(sCost);
    buyablesCosts.appendChild(dBenefit);
    buyablesCosts.appendChild(sBenefit);

    buyablesIndividual.appendChild(buyablesTitle);
    buyablesIndividual.appendChild(buyablesCosts);

    // Append the newly made individual box to the parent node
    buyablesParentNode.appendChild(buyablesIndividual);
}

// Main Functions
/* Functions */
/* Adds one dino per click */
function addDinos(e, howMany = 1){
    dinos += howMany;
    dinoNode.innerHTML = `${dinos}`;
}

/* Adds however many dinos are in dinosPerSec */
function addDPS(e){
    dinos -= e.target.dataset.dCost; console.log(e.target.dataset);
    dps += e.target.dataset.dBenefit;
    scales -= e.target.dataset.sCost;
    sps += e.target.dataset.sBenefit;
    dpsNode.innerHTML = `${dinos}`;
}

/* Removes dinos based on button's cost */
function calculateDinosAddedLarge(){
    dinos += dps/100;
    dinoNode.innerHTML = `${Math.round(currentDinoCount)}`;
}

/* Increase dinosPerSecond to adjust  */

function increaseDPS(e){
    console.log(e.target.dataset.added);
    dinosPerSec += parseFloat(e.target.dataset.added);
    dinoCounter.innerHTML = `${dinosPerSec}`;

    console.log(dinosPerSec);
    dinoCounter.innerHTML = `${dinosPerSec}`;

    /* Adjust the interval to account for dinos currently being created per second */
    clearInterval(currentInterval);
    if (dinosPerSec < 100){
        currentInterval = setInterval(addDinos, (100/dps));
    }
    else{
        currentInterval = setInterval(calculateDinosAddedLarge, 10);
    }
}

let currentInterval = setInterval(addDinos, 10000000000);
