// A document is what we call out HTML page
document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//const prevents it from breaking the game window reference
const gameWindow = document.getElementById("gameWindow");

const sec = 1000;

//Main character lines
const mainCharacter = document.getElementById("hero");
const offCharacter = 16;

//Avatar
const counterAvatar = document.getElementById("counterAvatar")

//audio
const heroAudio = document.getElementById("heroSpeech");
const chickenAudio = document.getElementById("counterSpeech");


//Inventory
let Inventory = [];
const inventoryList = document.getElementById("inventoryList");

//Speech bubles
const heroSpeech = document.getElementById("heroSpeech");
const counterSpeech = document.getElementById("counterSpeech");

//Trees
const tree1 = document.getElementById("squareTree");

//check if dialog is active
let checkDialogue = false;

//First java script function
gameWindow.onclick = function (e) { //e for event
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //Character movement
    //FIX: Character doesn't animate on first click.
    //FIX: Character goes out of bounds when you click on the character itself.
    //TODO: calc offset based on character size

    //This means that if you click anything else but the hero cube itself, it moves and prevents it going out of the canvas.
    if (e.target.id !== "hero" && counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {
        mainCharacter.style.left = x - offCharacter + "px";
        mainCharacter.style.top = y - offCharacter + "px";
    }

    //This does the same as the code below, but nicer 
    switch (e.target.id) {
        case "squareTree":
            tree1.style.opacity = 0.5;
            break;
        case "key":
            console.log("Oh sweet! I got a key!");
            document.getElementById("key").remove();
            changeInventory('key', "add");
            break;
        case "mushroom":
            console.log("Oh sweet! This mushroom is looking mighty tasty!");
            changeInventory("mushroom", "add");
            document.getElementById("mushroom").remove();
            break;
        case "chicken":
            console.log("bok bok");
            console.log("opbok");
        default:
            tree1.style.opacity = 1;
            break;
        case "doorSmallShak":
            if (checkItem("key")) {
                console.log("Door has been opened");
            } else if (checkItem("mushroom")) {
                changeInventory("mushroom", "remove")
                console.log("Shit, I lost my yummy mushroom!")
            } else {
                console.log("Shit, I need a key because its locked.")
            }

        case "chicken":
            showMessage(heroSpeech, "Hey there Chickems! How are you?", heroAudio);
            setTimeout(function () { counterAvatar.style.opacity = 1; })
            setTimeout(showMessage, 4 * sec, counterSpeech, "Bok bok..", chickenAudio);
            setTimeout(showMessage, 8 * sec, heroSpeech, "Teehee, silly chicken :3", heroAudio);
            setTimeout(showMessage, 12 * sec, counterSpeech, "You aren in grave danger.", chickenAudio);
            setTimeout(showMessage, 14 * sec, heroSpeech, "Wha-What the fuck!?", heroAudio);
            setTimeout(showMessage, 18 * sec, heroSpeech, "You can talk!?");
            setTimeout(function () { counterAvatar.style.opacity = 0; });

    }
}
/**
 * Add or remove item in inventory
 * @param {string} itemName 
 * @param {string} action 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.error("Ruh Roh, it went wrong in changeInventory()");
        return;
    }

    switch (action) {
        case 'add':
            Inventory.push(itemName);
            break;
        case 'remove':
            Inventory = Inventory.filter(function (newInventory) {
                return newInventory !== itemName;
            });
            document.getElementById("inv-" + itemName).remove();
            break;
    }
    updateInventory(Inventory, inventoryList);

}

/**
 * need a name for displaying items and html id name, checks if the value exists adds value to the array
 * if not then it adds value to the array and use function
 * @param {string} itemName 
 * @param {string} itemId 
 */
function showItem(itemName, itemId) {
    console.log('You\'ve found a ' + itemName + '!');
    const keyElement = document.createElement("li");
    keyElement.id = 'inv-' + itemId;
    keyElement.innerText = itemName;
    inventoryList.appendChild(keyElement);
}

function removeItem(itemName, itemId) {
    //Removes item in array
    Inventory = Inventory.filter(function (newInventory) {
        return newInventory !== itemName;
    });
    document.getElementById(itemId).remove();
}

function updateInventory(Inventory, inventoryList) {
    inventoryList.innerHTML = '';
    Inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = 'inv-' + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem)

    });
}

/**
 * 
 * @param {getElementById} targetBubble 
 * @param {string} message 
 */
function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4 * sec, targetBubble);
}
/**
 * 
 * @param {*} targetBubble 
 * @param {*} targetSound 
 */
function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.innerText = "...";
    targetBubble.style.opacity = 0;
    checkDialogue = false;

}

//showMessage(heroSpeech, "Wagwan lad.")
//showMessage(counterSpeech, "Wagwan.")


//runGame();