"use strict";
var icecreamshop;
(function (icecreamshop) {
    class Sauce extends icecreamshop.Clickable {
        constructor(_x, _myTaste) {
            super(_x, _myTaste);
        }
        draw() {
            icecreamshop.crc2.save();
            icecreamshop.crc2.translate(this.position.x, this.position.y);
            let pot = new Path2D();
            icecreamshop.crc2.fillStyle = "" + this.myOffer.color + "";
            icecreamshop.crc2.strokeStyle = "rgb(181, 181, 181)";
            icecreamshop.crc2.lineWidth = 7;
            pot.moveTo(165, 100);
            pot.arc(82.5, 100, 82.5, 0, 2 * Math.PI);
            icecreamshop.crc2.fill(pot);
            icecreamshop.crc2.stroke(pot);
            icecreamshop.crc2.restore();
        }
        clickBox(_clickPoint) {
            if ((_clickPoint.x >= this.position.x && _clickPoint.x <= 165 + this.position.x) && (_clickPoint.y >= 17.5 + this.position.y && _clickPoint.y <= 182.5 + this.position.y)) {
                icecreamshop.makeIceSauce(this.myOffer.color, this.myOffer.price);
            }
        }
    }
    icecreamshop.Sauce = Sauce;
})(icecreamshop || (icecreamshop = {}));
//# sourceMappingURL=Sauce.js.map