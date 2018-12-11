/* JavaScript */

// Main variables to keep track of and modify
let dinos = 0;      //amount of dinos the player currently has
let scales = 0;     //amount of dino scales the player currently has
let dps = 0;        //dinos generated per second
let sps = 0;        //scales generated per second
let dpsScalar = 1;  //scalar for dino generation
let spsScalar = 1;  //scalar for scale generation
let buyables = 1; //how many buildables the player has unlocked

// Get references to specific nodes to adjust and append to
let buyablesParentNode = document.querySelector("#buyables-parent");
let dinoNode = document.querySelector("#dino-info").querySelector(".play-stat");
let scalesNode = document.querySelector("#scale-info").querySelector(".play-stat");
let dpsNode = document.querySelector("#dps-info").querySelector(".play-stat");
let spsNode = document.querySelector("#sps-info").querySelector(".play-stat");
let clickerNode = document.querySelector("#create-dino");

// Create the default dino farm
createNewBuyableEntry("Dino Farm", 10, 0, 1, 2, 0.4, 0.2);

// Set up event listener for the clickable dino creation button
clickerNode.addEventListener("click", addDinosManual);

// Set up default buyables container
function createNewBuyableEntry(name, dinoCost, scaleCost, dps, sps, dCostScalar, sCostScalar){
    // Create list to hold all elements
    let elements = [];

    // Create all HTML sections and set their properties
    let buyablesIndividual = document.createElement("div");
    buyablesIndividual.className = "buyables-individual";
    elements.push(buyablesIndividual);

    /*
    buyablesIndividual.setAttribute("data-dCost", dinoCost);
    buyablesIndividual.setAttribute("data-sCost", scaleCost);
    buyablesIndividual.setAttribute("data-dBenefit", dps);
    buyablesIndividual.setAttribute("data-sBenefit", sps);
    */

    let buyablesTitle = document.createElement("h1");
    buyablesTitle.innerHTML = name;
    buyablesTitle.className = "buyables-title";
    elements.push(buyablesTitle);

    let buyablesCosts = document.createElement("div");
    buyablesCosts.className = "buyables-costs";
    elements.push(buyablesCosts);

    let dCost = document.createElement("p");
    dCost.innerHTML = `-${dinoCost} Dinos`;
    dCost.className = "cost";
    elements.push(dCost);

    let sCost = document.createElement("p");
    sCost.innerHTML = `-${scaleCost} Scales`;
    sCost.className = "cost";
    elements.push(sCost);

    let dBenefit = document.createElement("p");
    dBenefit.innerHTML = `+${dps} DPS`;
    dBenefit.className = "benefit";
    elements.push(dBenefit);

    let sBenefit = document.createElement("p");
    sBenefit.innerHTML = `+${sps} SPS`;
    sBenefit.className = "benefit";
    elements.push(sBenefit);

    // Add the dataset to all elements
    for(let i=0; i<elements.length; i++){
        elements[i].dataset.dCost = dinoCost;
        elements[i].dataset.sCost = scaleCost;
        elements[i].dataset.dBenefit = dps;
        elements[i].dataset.sBenefit = sps;
        elements[i].dataset.dCostScalar = dCostScalar;
        elements[i].dataset.sCostScalar = sCostScalar;
    }

    // Create an event listener for the div to add dinos based on click
    buyablesIndividual.addEventListener("click", addDPS);

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

// Dino Adding/Subtracting Functions region
/* Adds one dino per click */
function addDinosManual(e, howMany=1){
    dinos += howMany;
    updateVisuals();
}

function addDinosAutomatic(e, howMany=1){
    dinos += howMany/10;    //dividing neccesary because of update interval
    updateVisuals(e);
}

function addDinosLarge(e, howMany=1){
    dinos += dps/100;
    updateVisuals(e);
}

function addScalesAutomatic(e, howMany=1){
    scales += howMany/10;
}

function addScalesLarge(e){

}

/* Adds however many per second are stored in the sender's benefit value */
function addDPS(e){
    // Adjust internal values based on costs and benefits passed in
    let mainElement = e.target;
    while (mainElement.className != "buyables-individual"){
        mainElement = mainElement.parentElement; //traverse back to the parent container for all elements
    }

    // Check to make sure the player has enough dinos and scales to buy the upgrade
    if (dinos < mainElement.dataset.dCost || scales < mainElement.dataset.sCost){
        mainElement.style.backgroundColor = "lightcoral";
        setTimeout(()=>{mainElement.style.backgroundColor = "#EFEFEF"}, 115)
        return;
    }

    console.log(mainElement);
    dinos -= parseInt(mainElement.dataset.dCost);
    dps += parseInt(mainElement.dataset.dBenefit);
    scales -= parseInt(mainElement.dataset.sCost);
    sps += parseInt(mainElement.dataset.sBenefit);

    // Update the cost of the item
    mainElement.dataset.dCost *= 1 + parseFloat(e.target.dataset.dCostScalar);
    mainElement.dataset.sCost *= 1 + parseFloat(e.target.dataset.sCostScalar);

    // Change the visual display for the user
    updateVisuals(e);

    // Reset the intervals based on new numbers
    updateDinoIntervals();

    // Check if the player should unlock a new level of buildable
    checkForNewBuyable();

    // Give player a quick visual feedback blip
    mainElement.style.backgroundColor = "darkseagreen";
    setTimeout(()=>{mainElement.style.backgroundColor = "#EFEFEF"}, 115)
}

function checkForNewBuyable(){
    switch(buyables){
        case 1:
            if(dps >= 10){
                createNewBuyableEntry("Dino Factory", 1000, 7500, 5, 10, 0.4, 0.2);
                buyables++;
            }
            break;
        case 2:
            if (dps >= 100){
                createNewBuyableEntry("Dino Palace", 15000, 25000, 20, 50, 0.3, 0.3)
                buyables++;
            }
            break;
    }
}

function updateDinoIntervals(){
    if(dps < 100){
        currentDinoInterval = setInterval(addDinosAutomatic, (100/dps));
    }else{
        currentDinoInterval = setInterval(addDinosLarge, 10);
    }
    if(sps < 100){
        currentScaleInterval = setInterval(addScalesAutomatic, (100/sps));
    }else{
        currentDinoInterval = setInterval(addScalesLarge, 10);
    }
}

// endregion

/* Update the Screen values */
function updateVisuals(e){
    // Update the normal game visuals
    dinoNode.innerHTML = `${Math.round(dinos)}`;
    scalesNode.innerHTML = `${Math.round(scales)}`;
    dpsNode.innerHTML = Math.round(dps * dpsScalar);
    spsNode.innerHTML = Math.round(sps * spsScalar);

    if (e){
        // Update the button's visuals
        let mainElement = e.target;
        while (mainElement.className != "buyables-individual"){
            mainElement = mainElement.parentElement; //traverse back to the parent container for all elements
        }
        // Update the dino cost & scale cost
        let dinoCost = mainElement.querySelector(".buyables-costs").querySelector(".cost:nth-of-type(1)");
        let scaleCost = mainElement.querySelector(".buyables-costs").querySelector(".cost:nth-of-type(2)");

        dinoCost.innerHTML = `-${Math.round(mainElement.dataset.dCost)} Dinos`;
        scaleCost.innerHTML = `-${Math.round(mainElement.dataset.sCost)} Scales`;
    }
}

let currentDinoInterval = setInterval(addDinosAutomatic, 10000000000);
let currentScaleInterval = setInterval(addScalesAutomatic, 10000000000);
