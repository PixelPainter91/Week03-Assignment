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

const upgradeGifs = {
    weapon: "sprites/idledeathweapon1.gif",
    spellbook: "sprites/deathWithSpellBook.gif",
    cauldron: "sprites/deathCauldron.gif"
};
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
  weapon: { cost: Number(apiUpgrades[0]?.cost) || 50, cps: Number(apiUpgrades[0]?.cps) || 1 },
   spellbook: { cost: Number(apiUpgrades[1]?.cost) || 100, cps: Number(apiUpgrades[1]?.cps) || 10 },
  cauldron: { cost: Number(apiUpgrades[2]?.cost) || 250, cps: Number(apiUpgrades[2]?.cps) || 50}
};
    console.log("Upgrades loaded:", upgrades);

};
fetchUpgrades();
//upgrades

document.getElementById("loot").addEventListener("click", function(){
    currentItem="weapon";
});

document.getElementById("spellbook").addEventListener("click", function(){
currentItem = "spellbook";
}
);
document.getElementById("cauldron").addEventListener("click", function(){
    currentItem = "cauldron";
});

document.getElementById("buy").addEventListener("click", function () {
    if (!currentItem) {
        alert("Select an upgrade");
        return;
    }

    let item = upgrades[currentItem];
    if (!item) {
        alert("Upgrade not loaded");
        return;
    }

    let cost = item.cost;
    let gain = item.cps;

    if (totalSoulCount >= cost) {
        totalSoulCount -= cost;
        sps += gain;

        updateDOM();
        localStorage.setItem("totalSoulCount", totalSoulCount);
        localStorage.setItem("sps", sps);

        if (upgradeGifs[currentItem]) {
            lilDeath.src = upgradeGifs[currentItem];
            localStorage.setItem("equippedItem", currentItem);
        }

    } else {
        alert("Not Enough Souls");
    }
});



document.getElementById("sell").addEventListener("click", function () {
    if (!currentItem) {
        alert("Select an upgrade first!");
        return;
    }
   let item = upgrades[currentItem];
    if (!item){
        alert("upgrade not loaded");
    }
    sps -= item.cps;
    totalSoulCount += Math.floor(item.cost/2);

    currentItem = null;
    lilDeath.src = "sprites/idledeath.gif";

    updateDOM();
    localStorage.setItem("totalSoulCount", totalSoulCount);
    localStorage.setItem("sps", sps);
});




setInterval(function () {
    totalSoulCount += sps;
    updateDOM();
    localStorage.setItem("totalSoulCount", totalSoulCount);
}, 1000);



//reset button

document.getElementById("reset").addEventListener("click", function(){
    if(!confirm("Are you sure you want to reset your progress?")){
        return;
    }

    localStorage.clear();
        totalSoulCount = 0;
        sps = 0;
        currentItem = null;

        lilDeath.src= "./sprites/idledeath.gif";

        updateDOM();
    
});