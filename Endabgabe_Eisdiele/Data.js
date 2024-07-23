"use strict";
var icecreamshop;
(function (icecreamshop) {
    // save Data, to change change one of the entries, price and color at the moment relevant
    icecreamshop.offer = {
        Flavors: [
            { name: "Vanille", price: 4, color: "rgb(251, 252, 172)" },
            { name: "Blauer Engel", price: 4, color: "rgb(32, 142, 245)" },
            { name: "Waldmeister", price: 4, color: "rgb(191, 250, 135)" },
            { name: "Schokolade", price: 4, color: "rgb(79, 55, 4)" },
            { name: "Blaubeere", price: 4, color: "rgb(184, 31, 178)" },
            { name: "Erdbeere", price: 4, color: "rgb(242, 148, 193)" }
        ],
        Sauces: [
            { name: "Erdbeer-Sauce", price: 1, color: "rgb(153, 44, 44)" },
            { name: "Schokoladen-Sauce", price: 1, color: "rgb(120, 74, 1)" },
            { name: "Vanille-Sauce", price: 2, color: "rgb(247, 237, 94)" },
            { name: "Karamell-Sauce", price: 3, color: "rgb(201, 144, 0)" }
        ],
        Toppings: [
            { name: "Schokostreußel", price: 2, color: "rgb(0, 0, 0)" },
            { name: "Bunte Streußel", price: 1, color: "rgb(255, 255, 255)" }
        ]
    };
})(icecreamshop || (icecreamshop = {}));
//# sourceMappingURL=Data.js.map