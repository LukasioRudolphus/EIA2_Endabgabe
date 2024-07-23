namespace icecreamshop {
    export class Sauce extends Clickable {

        constructor(_x: number, _myTaste: OnSale) {
            super(_x, _myTaste);
        }
    
        draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            let pot: Path2D = new Path2D();
            crc2.fillStyle = "" + this.myOffer.color + "";
            crc2.strokeStyle = "rgb(181, 181, 181)";
            crc2.lineWidth = 7;
            pot.moveTo(165, 100);
            pot.arc(82.5, 100, 82.5, 0, 2 * Math.PI);
            crc2.fill(pot);
            crc2.stroke(pot);

            crc2.restore();
        }

        clickBox(_clickPoint: Vector): void {
            if ((_clickPoint.x >= this.position.x && _clickPoint.x <= 165 + this.position.x) && (_clickPoint.y >= 17.5 + this.position.y && _clickPoint.y <= 182.5 + this.position.y)) {
                makeIceSauce(this.myOffer.color, this.myOffer.price);
            }
        }

    }
}