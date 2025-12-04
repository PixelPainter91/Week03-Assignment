console.log("hello, world!");
//game logic 
//when the user clicks on the "cookie" the count of cookies goes up by 1

//when the user clicks on the "buy" button in an upgrade in the shop, the total count of cookies goes down byy the cost of the upgrade, and the cps value goes up

//we will need functions to contain the game logic

//we will get upgrades data from the API: https://cookie-upgrade-api.vercel.app/api/upgrades

//each function will have a task

// to create the logic for the shop upgrades two options:

//option 1: have a function to handle each upgrade

//option 2: have you could have a reuseable function that works for all upgrades 

//Tip on loacl storage: 
//- make sure the local storage values are updated after the user buys an ugrade AND when the user clicks on the cookie 

//===============================================
//data storage
let totalCookieCount = 0;
let cps = 0;
//or
/*let stats = {
    cookieCount: 0,
    cps: 0
};*/

//if there is data already in local storage update stats with this data so the user picks it up where they left off ==============================================
//shop upgrades 

//fetch the upgrades from the API

//create multiple DOM elements to contain the upgrades (loop)

//TODO: create DOM elemets for the shop upgrades

//- create the element
//- assohm the value to its property (textContent)
//--append it to the DOM

//after you complete this task, you shoud see the upgrades in your shop-container!
