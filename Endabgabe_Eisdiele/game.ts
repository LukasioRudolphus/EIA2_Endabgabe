namespace icecreamshop {
    // EIA2 Endabgabe: Abschlussarbeit_EisdealerLtd
    // SoSe 2024, MKB 2
    // Lukas Rudolph, 275732

    window.addEventListener("load", handleLoad);

    // Variablen
    export let crc2: CanvasRenderingContext2D;
    
    let canvasField: HTMLCanvasElement;
    let aCustomer: Customer;
    let allCustomers: Customer[] = [];
    let aChair: Vector;
    export let allChairs: Vector[] = [];
    let count: number = 0;
    let ice: IceCream;
    let iceNow: IceCream[] = [];
    let clickPoint: Vector;
    let aFlavor: Flavor;
    let aSauce: Sauce;
    let aTopping: Topping;
    let allClickFlavor: Flavor[] = [];
    let allClickSauce: Sauce[] = [];
    let allClickTopping: Topping[] = [];
    let whichSelection: selection;
    let confirmButton: Path2D;
    let targetSelection: Path2D;
    let allFlavors: OnSale[] = [];
    let allFlavorNames: String[] = [];
    let allSauces: OnSale[] = [];
    let allSauceNames: String[] = [];
    let allToppings: OnSale[] = [];
    let allToppingNames: String[] = [];
    let existingScoopNumber: number = 0;
    let existingIce: String[] = [];
    let existingPrice: number = 0;
    let targeted: boolean = false;
    let flavorInArray: boolean = false;
    let sauceInArray: boolean = false;
    let toppingInArray: boolean = false;
    let money: number = 0;

    // Enumerations
    export enum customerState {
        arriving,
        waiting,
        sitting,
        paying,
        leaving
    }

    export enum customerMood {
        good,
        notHappy,
        angry
    }

    enum selection {
        flavors,
        sauces,
        toppings,
        finished
    }

    export enum iceWhere {
        bottom,
        inBubble
    }

    // handleLoad
    function handleLoad(_event: Event): void {
        canvasField = document.querySelector("canvas")!;
        if(!canvasField){
            return
        }
        canvasField.width = window.innerWidth;
        canvasField.height = window.innerHeight;
        crc2 = <CanvasRenderingContext2D>canvasField.getContext("2d")!;

        // draw
        drawBackground();
        makeTable(250, 330);
        makeTable(1100, 220);
        makeTable(1450, 400);

        generateOnSale(offer);
        whichSelection = selection.flavors;
        drawSelection();
        moneyCounter();

        // initiate Customers
        aCustomer = new Customer();
        allCustomers.push(aCustomer);
        aCustomer.draw();
        platzZuweisung(aCustomer);

        aCustomer.happiness();

        // Event-Listener
        canvasField.addEventListener("click", chooseFlavor);

        // update
        window.setInterval(update, 20);
    }

    function update(): void {
        // new Customers
        count++;
        if (count % 10 == 0 && allCustomers.length < 13) {
            aCustomer = new Customer();
            allCustomers.push(aCustomer);
        }
        // draw
        drawBackground();
        drawSelection();
        moneyCounter();
        for (let customer of allCustomers) {
            if (customer.state == customerState.waiting && allChairs.length > 0) {
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

    function drawBackground(): void {
        // Pattern floor
        let patternFloor: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;
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

        crc2.fillStyle = crc2.createPattern(patternFloor.canvas, 'repeat')!;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        // Leiste unten
        crc2.fillStyle = "rgb(255, 250, 217)";
        crc2.fillRect(0, crc2.canvas.height - 300, crc2.canvas.width - 500, 300);

        crc2.fillStyle = "rgb(250, 250, 250)";
        crc2.fillRect(crc2.canvas.width - 500, crc2.canvas.height - 300, 500, 300);

        // Kasten Money
        crc2.fillStyle = "rgb(250, 250, 250)";
        crc2.fillRect(crc2.canvas.width - 220, 0, 230, 70);
        crc2.lineWidth = 6;
        crc2.strokeRect(crc2.canvas.width - 220, -10, 230, 80);
        crc2.lineWidth = 1;

        // confirm Button
        confirmButton = new Path2D();
        crc2.fillStyle = "rgb(40, 222, 2)";
        crc2.beginPath();
        confirmButton.arc(1225, crc2.canvas.height - 150, 40, 0, 2 * Math.PI);
        crc2.fill(confirmButton);

        crc2.save();
        crc2.translate(1225, crc2.canvas.height - 150);

        let check: Path2D = new Path2D();
        crc2.strokeStyle = "rgb(256, 256, 256)";
        crc2.lineWidth = 7;
        crc2.beginPath();
        check.moveTo(-21, 0);
        check.lineTo(-9, 14);
        check.lineTo(21, -18);
        crc2.stroke(check);

        crc2.restore();

        // Ellipse um Eis
        targetSelection = new Path2D();
        crc2.strokeStyle = "rgb(0, 0, 0)";
        crc2.fillStyle = "rgb(250, 250, 250)";
        crc2.beginPath();
        targetSelection.ellipse(crc2.canvas.width - 250, crc2.canvas.height - 133, 120, 90, 1.5708, 0, 2 * Math.PI);
        crc2.fill(targetSelection);
        if (targeted == true) {
            crc2.lineWidth = 5;
            crc2.stroke(targetSelection);
        }

        crc2.lineWidth = 1;

        // einfügen tables + chairs
        drawTable(250, 330);
        drawTable(1100, 220);
        drawTable(1450, 400);
    }

    function drawTable(_x: number, _y: number): void {
        let pattern: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;
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

        crc2.fillStyle = crc2.createPattern(pattern.canvas, 'repeat')!;

        let table: Path2D = new Path2D();
        crc2.beginPath();
        table.arc(_x, _y, 60, 0, 2 * Math.PI);
        crc2.lineWidth = 6;
        crc2.strokeStyle = "rgb(0, 0, 0)";
        crc2.stroke(table);
        crc2.fill(table);

        // chairs in dependence to table
        drawChair(_x, _y - 110);
        drawChair(_x + 110, _y);
        drawChair(_x, _y + 110);
        drawChair(_x - 110, _y);
    }

    function drawChair(_x: number, _y: number): void {
        let chair: Path2D = new Path2D();
        crc2.beginPath();
        crc2.lineWidth = 2;
        chair.arc(_x, _y, 25, 0, 2 * Math.PI);
        crc2.strokeStyle = "rgb(0, 0, 0)";
        crc2.stroke(chair);
        crc2.fillStyle = "rgb(202, 164, 114)";
        crc2.fill(chair);
    }

    // chairs in dependence to table
    function makeTable(_x: number, _y: number): void {
        makeChair(_x, _y - 110);
        makeChair(_x + 110, _y);
        makeChair(_x, _y + 110);
        makeChair(_x - 110, _y);
    }

    // save chair locations
    function makeChair(_x: number, _y: number): void {
        aChair = new Vector(_x, _y);
        allChairs.push(aChair); 
    }

    // if chair free, customer moves to it
    export function platzZuweisung(_c: Customer): void {
        let i: number;
        if (allChairs.length > 0) {
            i = Math.floor(Math.random()*allChairs.length);
            _c.destination(allChairs[i]);
            allChairs.splice(i, 1);
            _c.state = customerState.sitting;
        }
    }

    // delete customer
    export function customerLeaves(_c: Customer): void {
        let i: number = 0;
        for (let customer of allCustomers) {
            if (_c == customer) {
                allCustomers.splice(i, 1);
            }
            i++;
        }
    }

    // what is drawn bottom bar
    function drawSelection(): void {
        switch (whichSelection) {
            case selection.flavors:
                for (let i: number = 0; i < 6; i++) {
                    aFlavor = new Flavor(40 + 170 * i, allFlavors[i]);
                    aFlavor.draw();
                    if (flavorInArray == false) {
                        allClickFlavor.push(aFlavor);
                    }
                }
                flavorInArray = true;
                break;
            case selection.sauces:
                for (let i: number = 0; i < 4; i++) {
                    aSauce = new Sauce(90 + 255 * i, allSauces[i]);
                    aSauce.draw();
                    if (sauceInArray == false) {
                        allClickSauce.push(aSauce);
                    }
                }
                sauceInArray = true;
                break;
            case selection.toppings:
                for (let i: number = 0; i < 2; i++) {
                    aTopping = new Topping(330 + 495 * i, allToppings[i]);
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
    function chooseFlavor(_event: MouseEvent): void {
        let rect = canvasField.getBoundingClientRect();
        // speichern des Klickpunktes
        clickPoint = new Vector (_event.clientX - rect.left, _event.clientY - rect.top);

        // confirm Button clicked?
        if (crc2.isPointInPath(confirmButton, clickPoint.x, clickPoint.y)) {
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
    function generateOnSale(_offer: Data): void {
        allFlavors = _offer.Flavors;
        allSauces = _offer.Sauces;
        allToppings = _offer.Toppings;

        for (let i: number = 0; i < 6; i++) {
            allFlavorNames.push(_offer.Flavors[i].color);
        }
        for (let i: number = 0; i < 4; i++) {
            allSauceNames.push(_offer.Sauces[i].color);
        }
        for (let i: number = 0; i < 2; i++) {
            allToppingNames.push(_offer.Toppings[i].color);
        }
    }

    // how many Scoops? (in wishBubble)
    export function generateScoopNumber(): number {
        let guestScoopNumber = Math.floor(Math.random()*3) + 1;
        return guestScoopNumber;
    }

    // what is the order? (in wishBubble)
    export function generateDesire(_guestScoopNumber: number): String[] {
        let chosen: String[] = [];
        for (let i = 0; i < _guestScoopNumber; i++) {
            let scoop = allFlavorNames[Math.floor(Math.random()*allFlavorNames.length)];
            chosen.push(scoop);
        }
        let scoop = allSauceNames[Math.floor(Math.random()*allSauceNames.length)];
        chosen.push(scoop);
        scoop = allToppingNames[Math.floor(Math.random()*allToppingNames.length)];
        chosen.push(scoop);
        return chosen;
    }

    // add Ice Scoops (user)
    export function makeIceFlavor(_chosenFlavor: string, _chosenPrice: number): void {
        if (existingScoopNumber > 2) {
            return;
        }
        existingScoopNumber++;
        existingIce.push(_chosenFlavor);

        existingPrice += _chosenPrice;

        switch (existingScoopNumber) {
            case 1:
                ice = new IceCream(existingScoopNumber, existingIce);
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

    // add Sauce (user)
    export function makeIceSauce(_chosenSauce: string, _chosenPrice: number): void {
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

    // add Topping (user)
    export function makeIceTopping(_chosenTopping: string, _chosenPrice: number): void {
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

    // is usermade ice same as order?
    export function compare(_desire: String [], _customer: Customer): void {
        let delivery: String[] = iceNow[0].chosenTaste;
        let isTrue: number = 0;
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
        } else {
            _customer.leave();
        }
    }

    // add money from succesfull order
    export function payDay(_customer: Customer): void {
        money += existingPrice;
        _customer.leave();
    }

    // how much money?
    function moneyCounter(): void {
        Customer.drawMoney(crc2.canvas.width - 300, -90);
        crc2.fillStyle = "rgb(0, 0, 0)";
        crc2.font = "45px Arial";
        crc2.fillText("" + money + "", crc2.canvas.width - 135, 50);
    }
}

