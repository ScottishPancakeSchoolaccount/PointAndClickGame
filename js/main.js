// A document is what we call out HTML page
document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//const prevents it from breaking the game window reference
const gameWindow = document.getElementById("gameWindow");

//Main character lines
const mainCharacter = document.getElementById("hero");
const offCharacter = 16;

//Inventory
let Inventory = [];
const inventoryList = document.getElementById("inventoryList");

//Trees
const tree1 = document.getElementById("squareTree");

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
    if (e.target.id !== "hero") {
        mainCharacter.style.left = x - offCharacter + "px";
        mainCharacter.style.top = y - offCharacter + "px";
    }

    //This does the same as the code below, but nicer
    switch (e.target.id) {
        case "squareTree":
            tree1.style.opacity = 0.5;
            break;
        case "key":
            getItem("Rusty key", "rustyKey");
            break;
        case "mushroom":
            getItem("Rusty Mushroom", "rustyMushroom");
            break;
        case "doorSmallShak":
            if (checkItem("Rusty key")) {
                console.log("Door has been opened");
            } else if (checkItem("Rusty Mushroom")) {
                removeItem("Rusty Mushroom", "rustyMushroom")
                console.log("Shit, I lost my yummy mushroom!")

            } else {
                console.log("Shit, I need a key because its locked.")

            }
            break;
        case "chicken":
            console.log("bok bok");
            console.log("opbok");
        default:
            tree1.style.opacity = 1;
            break;

    }
    /**
     * Add or remove item in inventory
     * @param {string} itemName 
     * @param {string} action 
     */
    function changeInventory(itemName, action) {
        if (itemname == null || action == null) {
            console.error("Ruh Roh, it went wrong in changeInventory()");
            return;
        }

        switch (action) {
            case 'add':
                Inventory.push(itemName);
                break;
            case 'delete':
                Inventory = Inventory.filter(function (newInventory) {

                });
                document.getElementById(itemId).remove();
                break;
        }
        updateInventory(Inventory, inventoryList);

    }

    function getItem(itemName, itemId) {
        if (!checkItem(itemName)) {
            Inventory.push(itemName);
            showItem(itemName, itemId);
        }
        console.log(Inventory);
    }

    function checkItem(itemName) {
        return Inventory.includes(itemName);
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

    //So this is when the character goes in the tree the tree goes almost transparant, I could use this for a house design for a roof maybe
    //if (e.target.id == "squareTree") {
    //tree1.style.opacity = 0.5;
    // } else {
    //       tree1.style.opacity = 1;
    //  }
}
function updateInventory(Inventory, inventoryList) {
    inventoryList.innerHTML = '';
    Inventory.forEach(function () {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = 'inv' + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem)

    })
}
