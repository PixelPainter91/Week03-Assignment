console.log("hello, world!");
//game logic 

let totalSoulCount =parseInt(localStorage.getItem("totalSoulCount"))||0;
let sps = parseInt(localStorage.getItem("sps")) ||0;
let currentItem = null;
const soulBtn = document.getElementById("bluesoul");
const totalDisplay = document.querySelector("#count-countainer p:first-child");
const spsDisplay = document.querySelector("#count-countainer p:last-child");
const shopContainer = document.getElementById("shop");
const lilDeath = document.getElementById("lildeath");

let upgrades = {};

function updateDOM(){
    totalDisplay.textContent = `Total Soul: ${totalSoulCount}`;
    spsDisplay.textContent = `Souls per second (SPS): ${sps}`;
}
updateDOM();
//when the user clicks on the "cookie" the count of cookies goes up by 1
soulBtn.addEventListener("click", function(){
    totalSoulCount++;
    updateDOM();
    localStorage.setItem("totalSoulCount", totalSoulCount);
    
});
//we will get upgrades data from the API: https://cookie-upgrade-api.vercel.app/api/upgrades
async function fetchUpgrades(){
    const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
    const apiUpgrades = await response.json();

    upgrades = {
  weapon: { cost: Number(apiUpgrades[0]?.cost) || 0, cps: Number(apiUpgrades[0]?.cps) || 1 },
  spellbook: { cost: Number(apiUpgrades[1]?.cost) || 0, cps: Number(apiUpgrades[1]?.cps) || 2 },
  cauldron: { cost: Number(apiUpgrades[2]?.cost) || 0, cps: Number(apiUpgrades[2]?.cps) || 5}
};
    console.log("Upgrades loaded:", upgrades);

};
fetchUpgrades();
//upgrades

const weaponImg = document.getElementById("loot");
weaponImg.addEventListener("click", function(){
    currentItem = "weapon";

});


//when i add the speel book
const spellbookImg = document.getElementById("spellbook");
if (spellbookImg){
    spellbookImg.addEventListener("click", function(){
        currentItem = "spellbook";
    });
}
const cauldronImg = document.getElementById("cauldron");
if (cauldronImg){
    cauldronImg.addEventListener("click", function(){
        currentItem = "cauldron";
    });
}

const buyBtn = document.getElementById("buy");
buyBtn.addEventListener("click", function() {
    if (!currentItem) {
        alert("Select an upgrade!");
        return;
    }

    const item = upgrades[currentItem];
    if (!item) {
        alert("Upgrade not loaded");
        return;
    }

    const cost = Number(item.cost);
    const gain = Number(item.cps);

    if (totalSoulCount >= cost) {
        totalSoulCount -= cost;
        sps += gain;
        updateDOM();
        localStorage.setItem("totalSoulCount", totalSoulCount);
        localStorage.setItem("sps", sps);

    if (currentItem === "weapon") {
            lilDeath.src = "./sprites/idledeathweapon1.gif";
        }
    } else {
        alert("Not Enough Souls!");
    }
});


const sellBtn = document.getElementById("sell");
sellBtn.addEventListener("click", function() {
    if (!currentItem) {
        alert("Select an upgrade first!");
        return;
    }

    const item = upgrades[currentItem];
    if (!item) {
        alert("Upgrade data not loaded");
        return;
    }

    const cost = Number(item.cost);
    const gain = Number(item.cps);

    totalSoulCount += Math.floor(cost / 2);
    sps -= gain;
    if (sps < 0) sps = 0;

    updateDOM();
    localStorage.setItem("totalSoulCount", totalSoulCount);
    localStorage.setItem("sps", sps);
});



setInterval(function(){
    totalSoulCount += sps;// totalCookieCount = totalCookieCount + cps
    //update the DOM to reflec the changes in the value
    updateDOM();
    //save the values in the local storage
    localStorage.setItem("totalSoulCount", totalSoulCount);
}, 1000);
