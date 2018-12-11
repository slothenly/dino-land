/* JavaScript */

// Variables to keep track of
let dinos = 0;
let scales = 0;
let dps = 0;
let sps = 0;

// Get references to specific nodes to adjust and append to
let buyablesParentNode = document.querySelector("#buyables-parent");
let dinoNode = document.querySelector(".play-stat:nth-of-type(1)");
let scalesNode = document.querySelector(".play-stat:nth-of-type(2)");
let dpsNode = document.querySelector(".play-stat:nth-of-type(3)");
let spsNode = document.querySelector(".play-stat:nth-of-type(4)");

//create the default dino farm
createNewBuyableEntry("Dino Farm", 10, 0, 1, 2);

// Set up default buyables container
function createNewBuyableEntry(name, dinoCost, scaleCost, dps, sps){
    // Create all HTML sections and set their properties
    let buyablesIndividual = document.createElement("div");
    buyablesIndividual.className = "buyables-individual";

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
function plusDinos(e, howMany = 1){
    currentDinos += howMany;
    dinoCount.innerHTML = `${currentDinos}`;
}

/* Adds however many dinos are in dinosPerSec */
function plusDinoFarm(){
    currentDinoCount += 1;
    dinoCount2.innerHTML = `${currentDinoCount}`;
}

/* Removes dinos based on button's cost */
function plusDinoFarmLarge(){
    currentDinoCount += dinosPerSec/1000;
    dinoCount2.innerHTML = `${Math.round(currentDinoCount)}`;
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
        currentInterval = setInterval(plusDinoFarm, (100/dinosPerSec));
    }
    else{
        currentInterval = setInterval(plusDinoFarmLarge, 10);
    }
}

let currentInterval = setInterval(plusDinoFarm, 10000000000);
