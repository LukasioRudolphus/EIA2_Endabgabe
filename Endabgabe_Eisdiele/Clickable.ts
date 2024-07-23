namespace icecreamshop {
    export abstract class Clickable {
        protected position: Vector;
        protected nScoops: number;
        protected myOffer: OnSale;

        protected constructor(_x: number, _myTaste: OnSale) {
            this.position = new Vector(_x, crc2.canvas.height - 250);
            this.myOffer = _myTaste;
        }

        protected clickBox(_clickPoint: Vector): void {
        
        }

        protected draw(): void {

        }
    }
}