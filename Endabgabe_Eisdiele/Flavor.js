"use strict";
var icecreamshop;
(function (icecreamshop) {
    class Flavor extends icecreamshop.Clickable {
        constructor(_x, _myTaste) {
            super(_x, _myTaste);
        }
        draw() {
            icecreamshop.crc2.save();
            icecreamshop.crc2.translate(this.position.x, this.position.y);
            icecreamshop.crc2.fillStyle = "" + this.myOffer.color + "";
            icecreamshop.crc2.strokeStyle = "rgb(181, 181, 181)";
            icecreamshop.crc2.lineWidth = 7;
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.fillRect(0, 0, 130, 200);
            icecreamshop.crc2.strokeRect(0, 0, 130, 200);
            icecreamshop.crc2.restore();
        }
        clickBox(_clickPoint) {
            if ((_clickPoint.x >= this.position.x && _clickPoint.x <= 130 + this.position.x) && (_clickPoint.y >= this.position.y && _clickPoint.y <= 200 + this.position.y)) {
                icecreamshop.makeIceFlavor(this.myOffer.color, this.myOffer.price);
            }
        }
    }
    icecreamshop.Flavor = Flavor;
})(icecreamshop || (icecreamshop = {}));
//# sourceMappingURL=Flavor.js.map