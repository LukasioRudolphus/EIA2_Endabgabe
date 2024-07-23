"use strict";
var icecreamshop;
(function (icecreamshop) {
    class Clickable {
        position;
        nScoops;
        myOffer;
        constructor(_x, _myTaste) {
            this.position = new icecreamshop.Vector(_x, icecreamshop.crc2.canvas.height - 250);
            this.myOffer = _myTaste;
        }
        // clicked?
        clickBox(_clickPoint) {
        }
        draw() {
        }
    }
    icecreamshop.Clickable = Clickable;
})(icecreamshop || (icecreamshop = {}));
//# sourceMappingURL=Clickable.js.map