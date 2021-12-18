var inventory = {}
var workers = {}
var dps = new Decimal(0)

var default_inventory = {
    dirt: 0,
    cake: 0,
}

var workers = {
    "grub": {
        "label": "Find grub",
        "cost": 10,
        "value": 1,
        "owned": 0
    }
}

$('#produce-dirt').click(function () {
    inventory.dirt = inventory.dirt.plus(1);
});

$('#produce-cake').click(function () {
    if (inventory.dirt >= 10)
        inventory.dirt = inventory.dirt.minus(10);
    inventory.cake = inventory.cake.plus(1);
});

// workers
$('#find-grub').click(function () {
    $('#grub-cost').text(workers.grub.cost)
    if (inventory.dirt >= workers.grub.cost) {
        inventory.dirt = inventory.dirt.minus(workers.grub.cost);
        workers.grub.owned += 1
    }
    calculateIncome()
});

// Save
$('#save-game').click(saveGame);

// 
function calculateIncome() {
    var grub_inc = workers.grub.value * workers.grub.owned
    dps = new Decimal(grub_inc)
};

// UI
function updateScreen() {
    $('#dirt-count').text(inventory.dirt.toString());
    $('#cake-count').text(Math.floor(inventory.cake));

    // Workers
    $('#grub-cost').text(workers.grub.cost);
    // Hidy ho
    if (inventory.cake > 0)
        $('.cake-count').show();
};

// SAVE LOAD SYSTEM
function saveGame() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
    console.log("Saved game!");
};

function loadGame() {
    let data = JSON.parse(localStorage.getItem("inventory"));

    for (item in data) {
        inventory[item] = new Decimal(data[item])
    };
};



window.setInterval(function () {

    inventory.dirt = inventory.dirt.plus(dps)
    // numWidgets += widgetPS;

    // updateProgress();
    updateScreen();
}, 500);


$(document).ready(function () {
    if (localStorage.getItem("inventory") == null) {
        inventory = JSON.parse(JSON.stringify(default_inventory))
        saveGame()
        updateScreen();
    }
    else {
        loadGame()
        updateScreen();
    }



    if (inventory.cake == 0)
        $('.cake-count').hide();

});
