document.getElementById("mainTitle").innerText = "Point and Click adventure game";
// Game State
let gameState = {
    "inventory": [],
    "coinPickedUp": false,
    "keyPickedUp": false
}
//localStorage.removeItem("gameState");
if (Storage) {
    if (localStorage.gameState) {
        //uses localStorage gameState string and convert it to an object. then store it into gameState
        gameState = JSON.parse(localStorage.gameState);
    } else { localStorage.setItem("gameState", JSON.stringify(gameState)) } //convert local object variable to a string. then store it into localStorage
}

//Game window reference
const gameWindow = document.getElementById("gameWindow");
const inventoryList = document.getElementById("inventoryList");
const sec = 1000;

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 20;

//speech bubbles
const heroSpeech = document.getElementById("heroSpeech");
const counsterSpeech = document.getElementById("counterSpeech");
//audio for dialog
const heroAudio = document.getElementById("heroAudio");
const counterAudio = document.getElementById("counterAudio");

//avatar
const counterAvatar = document.getElementById("counterAvatar");


//Objects
if (gameState.keyPickedUp) {
    document.getElementById("key").remove();
}

updateInventory(gameState.inventory, inventoryList);


gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;


    //TODO: calc offset based on character size
    //TODO: making dialog functionality

    if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {
        if (e.target.id !== "heroImage") {
            mainCharacter.style.left = x - offsetCharacter + "px";
            mainCharacter.style.top = y - offsetCharacter + "px";
        }
        switch (e.target.id) {
            case "key":
                showMessage(heroSpeech, "Sweet! I  found a key, maybe it's for the wizard door.", heroAudio);
                document.getElementById("key").remove();
                changeInventory('key', "add");
                gameState.keyPickedUp = true;
                // saveBiscuits(gameState); //This will save the key after being picked up
                break;
            case "well":
                if (gameState.coinPickedUp == false) {
                    changeInventory("coin", "add");
                    gameState.coinPickedUp = true;
                } else {
                    console.log("There are no more coins in this well!");
                }
                break;
            case "doorWizardHut":
                if (checkItem("key")) {
                    showMessage(heroSpeech, "I opened the door. Yeah!", heroAudio);
                    setTimeout(function () { window.location.href = 'winner.html'; }, 4000); //This will have a 4 second delay before swapping to the win screen :D
                } else if (checkItem("coin")) {
                    changeInventory("coin", "remove");
                    showMessage(heroSpeech, "Oh no I lost the coin! I might've needed that for something..", heroAudio);
                } else {
                    showMessage(heroSpeech, "Shoot. It's locked, of course.", heroAudio);
                }
                break;
            case "chicken":
                if (checkItem("key")) {
                    showMessage(heroSpeech, "Heya chicken! How are you?", heroAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                    setTimeout(showMessage, 4 * sec, counsterSpeech, "Piss off, I am eating.", counterAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 0; }, 8 * sec);
                } else if (checkItem("coin")) {
                    showMessage(heroSpeech, "Oi nugget, I got a coin for you.", heroAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                    setTimeout(showMessage, 4.1 * sec, counsterSpeech, "Oh, you actually did? I thought you were a penny pincher.", counterAudio);
                    setTimeout(showMessage, 8.1 * sec, heroSpeech, "Right, well could you tell me where I could find the key?", heroAudio);
                    setTimeout(showMessage, 12.1 * sec, counsterSpeech, "A deal's a deal. The key's buried by the grass, South-West.", counterAudio);
                    setTimeout(showMessage, 16.1 * sec, heroSpeech, "Cheers.", heroAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                    gameState.inventory = gameState.inventory.filter(function (item) {
                        return item !== "coin";
                    });
                    updateInventory(gameState.inventory, inventoryList);
                } else {
                    showMessage(heroSpeech, "Teehee, hello chicken! ^^", heroAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                    setTimeout(showMessage, 4.1 * sec, counsterSpeech, "What do you want, knobhead?", counterAudio);
                    setTimeout(showMessage, 8.1 * sec, heroSpeech, "You can talk!?", heroAudio);
                    setTimeout(showMessage, 12.1 * sec, counsterSpeech, "Of course I can, you prick. You are a talking cat.", counterAudio);
                    setTimeout(showMessage, 16.1 * sec, heroSpeech, "Oh yeah silly me, could you tell me where I can find the key for the wizard hut?", heroAudio,);
                    setTimeout(showMessage, 20.1 * sec, counsterSpeech, "Tell ya what, if you could pay me first, then I'll give you a clue.", counterAudio);
                    setTimeout(showMessage, 24.1 * sec, heroSpeech, "*Hiss hiss*", heroAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 0; }, 25 * sec); //This is the duration of the chicken sprite
                    //console.log("hey you.. wanna know where the key is? It's by the graves.");
                }
                break;
            default:
                break;
        }
    }
}

/**
 * Add or remove item in inventory
 * @param {string} itemName 
 * @param {string} action 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.error("Wrong parameters given to changeInventory()");
        return;
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break;
        case 'remove':
            gameState.inventory = gameState.inventory.filter(function (newInventory) {
                return newInventory !== itemName;
            });
            document.getElementById("inv-" + itemName).remove();
            break;

    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * This returns string value if it exist within the array
 * @param {string} itemName 
 * @returns 
 */
function checkItem(itemName) {
    return gameState.inventory.includes(itemName);
}

function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = 'inv-' + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * It will show dialog and trigger sound.
 * @param {getElementById} targetBubble 
 * @param {string} message
 * @param {getElementById} targetSound 
 */
function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4 * sec, targetBubble, targetSound);
}

/**
 * Hides message and pauze the audio
 * @param {getElementById} targetBubble 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.innerText = "...";
    targetBubble.style.opacity = 0;
}

///**
//*
//* @param {*} gameState
// */
//function saveBiscuits(gameState) {
//   localStorage.gameState = JSON.stringify(gameState);
//} 
