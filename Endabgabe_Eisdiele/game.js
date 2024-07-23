"use strict";
var icecreamshop;
(function (icecreamshop) {
    // EIA2 Endabgabe: Abschlussarbeit_EisdealerLtd
    // SoSe 2024, MKB 2
    // Lukas Rudolph, 275732
    window.addEventListener("load", handleLoad);
    let canvasField;
    let aCustomer;
    let allCustomers = [];
    let aChair;
    icecreamshop.allChairs = [];
    let count = 0;
    let ice;
    let iceNow = [];
    let clickPoint;
    let aFlavor;
    let aSauce;
    let aTopping;
    let allClickFlavor = [];
    let allClickSauce = [];
    let allClickTopping = [];
    let whichSelection;
    let confirmButton;
    let targetSelection;
    let allFlavors = [];
    let allFlavorNames = [];
    let allSauces = [];
    let allSauceNames = [];
    let allToppings = [];
    let allToppingNames = [];
    let existingScoopNumber = 0;
    let existingIce = [];
    let existingPrice = 0;
    let targeted = false;
    let flavorInArray = false;
    let sauceInArray = false;
    let toppingInArray = false;
    let money = 0;
    // Enumerations
    let customerState;
    (function (customerState) {
        customerState[customerState["arriving"] = 0] = "arriving";
        customerState[customerState["waiting"] = 1] = "waiting";
        customerState[customerState["sitting"] = 2] = "sitting";
        customerState[customerState["paying"] = 3] = "paying";
        customerState[customerState["leaving"] = 4] = "leaving";
    })(customerState = icecreamshop.customerState || (icecreamshop.customerState = {}));
    let customerMood;
    (function (customerMood) {
        customerMood[customerMood["good"] = 0] = "good";
        customerMood[customerMood["notHappy"] = 1] = "notHappy";
        customerMood[customerMood["angry"] = 2] = "angry";
    })(customerMood = icecreamshop.customerMood || (icecreamshop.customerMood = {}));
    let selection;
    (function (selection) {
        selection[selection["flavors"] = 0] = "flavors";
        selection[selection["sauces"] = 1] = "sauces";
        selection[selection["toppings"] = 2] = "toppings";
        selection[selection["finished"] = 3] = "finished";
    })(selection || (selection = {}));
    let iceWhere;
    (function (iceWhere) {
        iceWhere[iceWhere["bottom"] = 0] = "bottom";
        iceWhere[iceWhere["inBubble"] = 1] = "inBubble";
    })(iceWhere = icecreamshop.iceWhere || (icecreamshop.iceWhere = {}));
    // handleLoad
    function handleLoad(_event) {
        canvasField = document.querySelector("canvas");
        if (!canvasField) {
            return;
        }
        canvasField.width = window.innerWidth;
        canvasField.height = window.innerHeight;
        icecreamshop.crc2 = canvasField.getContext("2d");
        // draw
        drawBackground();
        makeTable(250, 330);
        makeTable(1100, 220);
        makeTable(1450, 400);
        generateOnSale(icecreamshop.offer);
        whichSelection = selection.flavors;
        drawSelection();
        moneyCounter();
        // initiate Customers
        aCustomer = new icecreamshop.Customer();
        allCustomers.push(aCustomer);
        aCustomer.draw();
        platzZuweisung(aCustomer);
        aCustomer.happiness();
        // Event-Listener
        canvasField.addEventListener("click", chooseFlavor);
        // update
        window.setInterval(update, 20);
    }
    function update() {
        // new Customers
        count++;
        if (count % 10 == 0 && allCustomers.length < 13) {
            aCustomer = new icecreamshop.Customer();
            allCustomers.push(aCustomer);
        }
        // draw
        drawBackground();
        drawSelection();
        moneyCounter();
        for (let customer of allCustomers) {
            if (customer.state == customerState.waiting && icecreamshop.allChairs.length > 0) {
                platzZuweisung(customer);
            }
            customer.move();
            customer.happiness();
            customer.draw();
        }
        for (let ice of iceNow) {
            ice.draw(1);
        }
    }
    function drawBackground() {
        // Pattern floor
        let patternFloor = document.createElement('canvas').getContext('2d');
        patternFloor.canvas.width = 80;
        patternFloor.canvas.height = 40;
        patternFloor.fillStyle = "rgb(128, 83, 0)";
        patternFloor.fillRect(0, 0, patternFloor.canvas.width, patternFloor.canvas.height);
        patternFloor.moveTo(0, 20);
        patternFloor.lineTo(80, 20);
        patternFloor.lineTo(80, 0);
        patternFloor.lineTo(0, 0);
        patternFloor.lineTo(0, 20);
        patternFloor.moveTo(40, 40);
        patternFloor.lineTo(120, 40);
        patternFloor.lineTo(120, 20);
        patternFloor.lineTo(40, 20);
        patternFloor.lineTo(40, 40);
        patternFloor.stroke();
        icecreamshop.crc2.fillStyle = icecreamshop.crc2.createPattern(patternFloor.canvas, 'repeat');
        icecreamshop.crc2.fillRect(0, 0, icecreamshop.crc2.canvas.width, icecreamshop.crc2.canvas.height);
        // Leiste unten
        icecreamshop.crc2.fillStyle = "rgb(255, 250, 217)";
        icecreamshop.crc2.fillRect(0, icecreamshop.crc2.canvas.height - 300, icecreamshop.crc2.canvas.width - 500, 300);
        icecreamshop.crc2.fillStyle = "rgb(250, 250, 250)";
        icecreamshop.crc2.fillRect(icecreamshop.crc2.canvas.width - 500, icecreamshop.crc2.canvas.height - 300, 500, 300);
        // Kasten Money
        icecreamshop.crc2.fillStyle = "rgb(250, 250, 250)";
        icecreamshop.crc2.fillRect(icecreamshop.crc2.canvas.width - 220, 0, 230, 70);
        icecreamshop.crc2.lineWidth = 6;
        icecreamshop.crc2.strokeRect(icecreamshop.crc2.canvas.width - 220, -10, 230, 80);
        icecreamshop.crc2.lineWidth = 1;
        // confirm Button
        confirmButton = new Path2D();
        icecreamshop.crc2.fillStyle = "rgb(40, 222, 2)";
        icecreamshop.crc2.beginPath();
        confirmButton.arc(1225, icecreamshop.crc2.canvas.height - 150, 40, 0, 2 * Math.PI);
        icecreamshop.crc2.fill(confirmButton);
        icecreamshop.crc2.save();
        icecreamshop.crc2.translate(1225, icecreamshop.crc2.canvas.height - 150);
        let check = new Path2D();
        icecreamshop.crc2.strokeStyle = "rgb(256, 256, 256)";
        icecreamshop.crc2.lineWidth = 7;
        icecreamshop.crc2.beginPath();
        check.moveTo(-21, 0);
        check.lineTo(-9, 14);
        check.lineTo(21, -18);
        icecreamshop.crc2.stroke(check);
        icecreamshop.crc2.restore();
        // Ellipse um Eis
        targetSelection = new Path2D();
        icecreamshop.crc2.strokeStyle = "rgb(0, 0, 0)";
        icecreamshop.crc2.fillStyle = "rgb(250, 250, 250)";
        icecreamshop.crc2.beginPath();
        targetSelection.ellipse(icecreamshop.crc2.canvas.width - 250, icecreamshop.crc2.canvas.height - 133, 120, 90, 1.5708, 0, 2 * Math.PI);
        icecreamshop.crc2.fill(targetSelection);
        if (targeted == true) {
            icecreamshop.crc2.lineWidth = 5;
            icecreamshop.crc2.stroke(targetSelection);
        }
        icecreamshop.crc2.lineWidth = 1;
        // einfügen tables + chairs
        drawTable(250, 330);
        drawTable(1100, 220);
        drawTable(1450, 400);
    }
    function drawTable(_x, _y) {
        let pattern = document.createElement('canvas').getContext('2d');
        pattern.canvas.width = 80;
        pattern.canvas.height = 14;
        pattern.fillStyle = "rgb(202, 164, 114)";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 7);
        pattern.lineTo(80, 7);
        pattern.moveTo(80, 0);
        pattern.lineTo(0, 0);
        pattern.lineTo(0, 7);
        pattern.stroke();
        icecreamshop.crc2.fillStyle = icecreamshop.crc2.createPattern(pattern.canvas, 'repeat');
        let table = new Path2D();
        icecreamshop.crc2.beginPath();
        table.arc(_x, _y, 60, 0, 2 * Math.PI);
        icecreamshop.crc2.lineWidth = 6;
        icecreamshop.crc2.strokeStyle = "rgb(0, 0, 0)";
        icecreamshop.crc2.stroke(table);
        icecreamshop.crc2.fill(table);
        // chairs in dependence to table
        drawChair(_x, _y - 110);
        drawChair(_x + 110, _y);
        drawChair(_x, _y + 110);
        drawChair(_x - 110, _y);
    }
    function drawChair(_x, _y) {
        let chair = new Path2D();
        icecreamshop.crc2.beginPath();
        icecreamshop.crc2.lineWidth = 2;
        chair.arc(_x, _y, 25, 0, 2 * Math.PI);
        icecreamshop.crc2.strokeStyle = "rgb(0, 0, 0)";
        icecreamshop.crc2.stroke(chair);
        icecreamshop.crc2.fillStyle = "rgb(202, 164, 114)";
        icecreamshop.crc2.fill(chair);
    }
    // chairs in dependence to table
    function makeTable(_x, _y) {
        makeChair(_x, _y - 110);
        makeChair(_x + 110, _y);
        makeChair(_x, _y + 110);
        makeChair(_x - 110, _y);
    }
    // save chair locations
    function makeChair(_x, _y) {
        aChair = new icecreamshop.Vector(_x, _y);
        icecreamshop.allChairs.push(aChair);
    }
    // if chair free, customer moves to it
    function platzZuweisung(_c) {
        let i;
        if (icecreamshop.allChairs.length > 0) {
            i = Math.floor(Math.random() * icecreamshop.allChairs.length);
            _c.destination(icecreamshop.allChairs[i]);
            icecreamshop.allChairs.splice(i, 1);
            _c.state = customerState.sitting;
        }
    }
    icecreamshop.platzZuweisung = platzZuweisung;
    // delete customer
    function customerLeaves(_c) {
        let i = 0;
        for (let customer of allCustomers) {
            if (_c == customer) {
                allCustomers.splice(i, 1);
            }
            i++;
        }
    }
    icecreamshop.customerLeaves = customerLeaves;
    // what is drawn bottom bar
    function drawSelection() {
        switch (whichSelection) {
            case selection.flavors:
                for (let i = 0; i < 6; i++) {
                    aFlavor = new icecreamshop.Flavor(40 + 170 * i, allFlavors[i]);
                    aFlavor.draw();
                    if (flavorInArray == false) {
                        allClickFlavor.push(aFlavor);
                    }
                }
                flavorInArray = true;
                break;
            case selection.sauces:
                for (let i = 0; i < 4; i++) {
                    aSauce = new icecreamshop.Sauce(90 + 255 * i, allSauces[i]);
                    aSauce.draw();
                    if (sauceInArray == false) {
                        allClickSauce.push(aSauce);
                    }
                }
                sauceInArray = true;
                break;
            case selection.toppings:
                for (let i = 0; i < 2; i++) {
                    aTopping = new icecreamshop.Topping(330 + 495 * i, allToppings[i]);
                    aTopping.draw();
                    if (toppingInArray == false) {
                        allClickTopping.push(aTopping);
                    }
                }
                toppingInArray = true;
                break;
            case selection.finished:
                // ellipse drawn from now on
                targeted = true;
                break;
            default:
                break;
        }
    }
    // where clicked?
    function chooseFlavor(_event) {
        let rect = canvasField.getBoundingClientRect();
        // speichern des Klickpunktes
        clickPoint = new icecreamshop.Vector(_event.clientX - rect.left, _event.clientY - rect.top);
        // confirm Button clicked?
        if (icecreamshop.crc2.isPointInPath(confirmButton, clickPoint.x, clickPoint.y)) {
            switch (whichSelection) {
                case selection.flavors:
                    if (existingScoopNumber < 1) {
                        return;
                    }
                    whichSelection = selection.sauces;
                    break;
                case selection.sauces:
                    if (ice.sauceChosen == false) {
                        return;
                    }
                    whichSelection = selection.toppings;
                    break;
                case selection.toppings:
                    if (ice.toppingChosen == false) {
                        return;
                    }
                    whichSelection = selection.finished;
                    break;
                default:
                    break;
            }
        }
        // Ingredient clicked?
        switch (whichSelection) {
            case selection.flavors:
                for (let clickable of allClickFlavor) {
                    clickable.clickBox(clickPoint);
                }
                break;
            case selection.sauces:
                for (let clickable of allClickSauce) {
                    clickable.clickBox(clickPoint);
                }
                break;
            case selection.toppings:
                for (let clickable of allClickTopping) {
                    clickable.clickBox(clickPoint);
                }
                break;
            default:
                break;
        }
        // bubble clicked?
        for (let customer of allCustomers) {
            if (customer.wishBubble != undefined) {
                customer.compareIceCream(clickPoint);
            }
        }
    }
    // put Data in arrays 
    function generateOnSale(_offer) {
        allFlavors = _offer.Flavors;
        allSauces = _offer.Sauces;
        allToppings = _offer.Toppings;
        for (let i = 0; i < 6; i++) {
            allFlavorNames.push(_offer.Flavors[i].color);
        }
        for (let i = 0; i < 4; i++) {
            allSauceNames.push(_offer.Sauces[i].color);
        }
        for (let i = 0; i < 2; i++) {
            allToppingNames.push(_offer.Toppings[i].color);
        }
    }
    // how many Scoops? (in wishBubble)
    function generateScoopNumber() {
        let guestScoopNumber = Math.floor(Math.random() * 3) + 1;
        return guestScoopNumber;
    }
    icecreamshop.generateScoopNumber = generateScoopNumber;
    // what is the order? (in wishBubble)
    function generateDesire(_guestScoopNumber) {
        let chosen = [];
        for (let i = 0; i < _guestScoopNumber; i++) {
            let scoop = allFlavorNames[Math.floor(Math.random() * allFlavorNames.length)];
            chosen.push(scoop);
        }
        let scoop = allSauceNames[Math.floor(Math.random() * allSauceNames.length)];
        chosen.push(scoop);
        scoop = allToppingNames[Math.floor(Math.random() * allToppingNames.length)];
        chosen.push(scoop);
        return chosen;
    }
    icecreamshop.generateDesire = generateDesire;
    // add Ice Scoops (user)
    function makeIceFlavor(_chosenFlavor, _chosenPrice) {
        if (existingScoopNumber > 2) {
            return;
        }
        existingScoopNumber++;
        existingIce.push(_chosenFlavor);
        existingPrice += _chosenPrice;
        switch (existingScoopNumber) {
            case 1:
                ice = new icecreamshop.IceCream(existingScoopNumber, existingIce);
                ice.where(iceWhere.bottom);
                ice.draw(1);
                iceNow.push(ice);
                break;
            case 2:
                ice.moreScoops(existingScoopNumber, existingIce);
                ice.draw(1);
                iceNow.splice(0, 1);
                iceNow.push(ice);
                break;
            case 3:
                ice.moreScoops(existingScoopNumber, existingIce);
                ice.draw(1);
                iceNow.splice(0, 1);
                iceNow.push(ice);
                break;
            default:
                break;
        }
    }
    icecreamshop.makeIceFlavor = makeIceFlavor;
    // add Sauce (user)
    function makeIceSauce(_chosenSauce, _chosenPrice) {
        if (ice.sauceChosen == true) {
            return;
        }
        existingIce.push(_chosenSauce);
        ice.addSauce();
        ice.draw(1);
        iceNow.splice(0, 1);
        iceNow.push(ice);
        existingPrice += _chosenPrice;
    }
    icecreamshop.makeIceSauce = makeIceSauce;
    // add Topping (user)
    function makeIceTopping(_chosenTopping, _chosenPrice) {
        if (ice.toppingChosen == true) {
            return;
        }
        existingIce.push(_chosenTopping);
        ice.addTopping();
        ice.draw(1);
        iceNow.splice(0, 1);
        iceNow.push(ice);
        existingPrice += _chosenPrice;
    }
    icecreamshop.makeIceTopping = makeIceTopping;
    // is usermade ice same as order?
    function compare(_desire, _customer) {
        let delivery = iceNow[0].chosenTaste;
        let isTrue = 0;
        for (let i = 0; i < delivery.length; i++) {
            if (delivery[i] == _desire[i]) {
                isTrue++;
            }
        }
        // reset bottom
        whichSelection = selection.flavors;
        targeted = false;
        iceNow.splice(0, 1);
        existingIce = [];
        existingScoopNumber = 0;
        if (isTrue == delivery.length) {
            _customer.pay();
        }
        else {
            _customer.leave();
        }
    }
    icecreamshop.compare = compare;
    // add money from succesfull order
    function payDay(_customer) {
        money += existingPrice;
        _customer.leave();
    }
    icecreamshop.payDay = payDay;
    // how much money?
    function moneyCounter() {
        icecreamshop.Customer.drawMoney(icecreamshop.crc2.canvas.width - 300, -90);
        icecreamshop.crc2.fillStyle = "rgb(0, 0, 0)";
        icecreamshop.crc2.font = "45px Arial";
        icecreamshop.crc2.fillText("" + money + "", icecreamshop.crc2.canvas.width - 135, 50);
    }
})(icecreamshop || (icecreamshop = {}));
//# sourceMappingURL=game.js.map