namespace icecreamshop {
    export class Flavor extends Clickable {

        constructor(_x: number, _myTaste: OnSale) {
            super(_x, _myTaste);
        }
    
        draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            crc2.fillStyle = "" + this.myOffer.color + "";
            crc2.strokeStyle = "rgb(181, 181, 181)";
            crc2.lineWidth = 7;
            crc2.beginPath();
            crc2.fillRect(0, 0, 130, 200);
            crc2.strokeRect(0, 0, 130, 200);

            crc2.restore();
        }

        // clicked?
        clickBox(_clickPoint: Vector): void {
            if ((_clickPoint.x >= this.position.x && _clickPoint.x <= 130 + this.position.x) && (_clickPoint.y >= this.position.y && _clickPoint.y <= 200 + this.position.y)) {
                makeIceFlavor(this.myOffer.color, this.myOffer.price);
            }
        }

    }
}