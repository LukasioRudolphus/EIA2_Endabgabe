namespace icecreamshop {
    export class Customer {
        private position: Vector;
        private speed: Vector;
        private guestMood: customerMood;
        private mood: number;
        private goal: Vector;
        private chair: Vector;
        state: customerState;
        private desire: String[];
        private numberScoops: number;
        wishBubble: Path2D;
        private waitPoint: Vector;

        constructor() {
            this.position = new Vector(-40, 50);
            this.speed = new Vector(10, 0);
            this.guestMood = customerMood.good;
            this.mood = 0;
            this.state = customerState.arriving;
            this.waitPoint = new Vector(100, 50);
        }

        // draw
        draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            // smileys
            let customer: Path2D = new Path2D();
            crc2.beginPath();
            customer.arc(0, 0, 40, 0, 2 * Math.PI);

            let customerFace: Path2D = new Path2D();
            crc2.beginPath();
            // eyes
            customerFace.arc(-15, -15, 5, 0, 2 * Math.PI);
            customerFace.moveTo(15, -15);
            customerFace.arc(15, -15, 5, 0, 2 * Math.PI);
            crc2.strokeStyle = "rgb(0, 0, 0)";
            // color + mouth
            switch (this.guestMood) {
                case customerMood.good:
                    crc2.fillStyle = "rgb(35, 201, 2)";
                    customerFace.moveTo(-25, 5);
                    customerFace.bezierCurveTo(-20, 30, 20, 30, 25, 5);
                    break;
                case customerMood.notHappy:
                    crc2.fillStyle = "rgb(240, 206, 12)";
                    customerFace.moveTo(-25, 10);
                    customerFace.bezierCurveTo(-20, 12, 20, 12, 25, 10);
                    break;
                case customerMood.angry:
                    crc2.fillStyle = "rgb(191, 32, 8)";
                    customerFace.moveTo(-25, 20);
                    customerFace.bezierCurveTo(-20, -5, 20, -5, 25, 20);
                    break;
                default:
                    break;
            }
            crc2.fill(customer);

            crc2.fillStyle = "rgb(0, 0, 0)";
            crc2.stroke(customerFace);
            crc2.fill(customerFace);

            // wishbubble
            if (this.goal != undefined) {
                if (this.goal.x == 0 && this.goal.y == 0) {
                    this.wishBubble = new Path2D();
                    crc2.fillStyle = "rgb(250, 250, 250)";
                    crc2.strokeStyle = "rgb(250, 250, 250)";
                    crc2.beginPath();
                    this.wishBubble.moveTo(-40, 0);
                    this.wishBubble.lineTo(-60, 4);
                    this.wishBubble.lineTo(-55, -20);
                    this.wishBubble.lineTo(-40, 0);
                    this.wishBubble.moveTo(-100, -20);
                    this.wishBubble.ellipse(-100, -20, 50, 40, 0, 0, 2 * Math.PI);
                    crc2.stroke(this.wishBubble);
                    crc2.fill(this.wishBubble);
                    
                    if (this.numberScoops == undefined) {
                        this.numberScoops = generateScoopNumber();
                        this.desire = generateDesire(this.numberScoops);
                    }

                    // whats inside wishbubble?
                    switch (this.state) {
                        case customerState.sitting:
                            // ice Cream order
                            let ice: IceCream = new IceCream(this.numberScoops, this.desire);
                            ice.where(iceWhere.inBubble);
                            ice.draw(0.37);
                            break;
                        case customerState.paying:
                            // money
                            Customer.drawMoney(-220, -145);
                            break;
                        default:
                            break;
                    }
                }
            }

            crc2.restore();
        }

        // draw Money
        static drawMoney(_x: number, _y: number): void {
            crc2.save();
            crc2.translate(_x, _y);

            {
                crc2.save();
                crc2.transform(0.866336, 0.000000, 0.000000, 0.866336, 40.334000, 80.889400);
                
                crc2.fillStyle = 'rgb(236, 239, 20)';
                crc2.strokeStyle = 'rgb(0, 0, 0)';
                crc2.lineWidth = 0.070115;
            
                crc2.beginPath();
                crc2.moveTo(79.448769, 56.542589);
                crc2.bezierCurveTo(87.032993, 56.542589, 93.181221, 59.802579, 93.181221, 63.823982);
                crc2.bezierCurveTo(93.181221, 67.845385, 87.032993, 71.105376, 79.448769, 71.105376);
                crc2.bezierCurveTo(71.864545, 71.105376, 65.716317, 67.845385, 65.716317, 63.823982);
                crc2.bezierCurveTo(65.716317, 59.802579, 71.864545, 56.542589, 79.448769, 56.542589);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(79.372475, 55.631731);
                crc2.bezierCurveTo(86.956699, 55.631731, 93.104927, 58.891721, 93.104927, 62.913124);
                crc2.bezierCurveTo(93.104927, 66.934527, 86.956699, 70.194518, 79.372475, 70.194518);
                crc2.bezierCurveTo(71.788251, 70.194518, 65.640023, 66.934527, 65.640023, 62.913124);
                crc2.bezierCurveTo(65.640023, 58.891721, 71.788251, 55.631731, 79.372475, 55.631731);
                crc2.fill();
                crc2.stroke();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -24.143600, 19.544800);
                
                crc2.beginPath();
                crc2.moveTo(102.698120, 34.215928);
                crc2.bezierCurveTo(110.282344, 34.215928, 116.430572, 37.475919, 116.430572, 41.497322);
                crc2.bezierCurveTo(116.430572, 45.518725, 110.282344, 48.778715, 102.698120, 48.778715);
                crc2.bezierCurveTo(95.113896, 48.778715, 88.965668, 45.518725, 88.965668, 41.497322);
                crc2.bezierCurveTo(88.965668, 37.475919, 95.113896, 34.215928, 102.698120, 34.215928);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(102.621830, 33.305070);
                crc2.bezierCurveTo(110.206054, 33.305070, 116.354282, 36.565061, 116.354282, 40.586464);
                crc2.bezierCurveTo(116.354282, 44.607867, 110.206054, 47.867857, 102.621830, 47.867857);
                crc2.bezierCurveTo(95.037606, 47.867857, 88.889378, 44.607867, 88.889378, 40.586464);
                crc2.bezierCurveTo(88.889378, 36.565061, 95.037606, 33.305070, 102.621830, 33.305070);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, 26.059700, 18.906100);
                
                crc2.beginPath();
                crc2.moveTo(54.420086, 32.610234);
                crc2.bezierCurveTo(62.004310, 32.610234, 68.152538, 35.870225, 68.152538, 39.891628);
                crc2.bezierCurveTo(68.152538, 43.913031, 62.004310, 47.173021, 54.420086, 47.173021);
                crc2.bezierCurveTo(46.835862, 47.173021, 40.687634, 43.913031, 40.687634, 39.891628);
                crc2.bezierCurveTo(40.687634, 35.870225, 46.835862, 32.610234, 54.420086, 32.610234);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(54.343792, 31.699376);
                crc2.bezierCurveTo(61.928016, 31.699376, 68.076244, 34.959367, 68.076244, 38.980770);
                crc2.bezierCurveTo(68.076244, 43.002173, 61.928016, 46.262163, 54.343792, 46.262163);
                crc2.bezierCurveTo(46.759568, 46.262163, 40.611340, 43.002173, 40.611340, 38.980770);
                crc2.bezierCurveTo(40.611340, 34.959367, 46.759568, 31.699376, 54.343792, 31.699376);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, 39.089600, -6.642670);
                
                crc2.beginPath();
                crc2.moveTo(39.912273, 55.339525);
                crc2.bezierCurveTo(47.496497, 55.339525, 53.644725, 58.599515, 53.644725, 62.620918);
                crc2.bezierCurveTo(53.644725, 66.642321, 47.496497, 69.902311, 39.912273, 69.902311);
                crc2.bezierCurveTo(32.328049, 69.902311, 26.179821, 66.642321, 26.179821, 62.620918);
                crc2.bezierCurveTo(26.179821, 58.599515, 32.328049, 55.339525, 39.912273, 55.339525);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(39.835979, 54.428666);
                crc2.bezierCurveTo(47.420203, 54.428666, 53.568431, 57.688657, 53.568431, 61.710060);
                crc2.bezierCurveTo(53.568431, 65.731463, 47.420203, 68.991454, 39.835979, 68.991454);
                crc2.bezierCurveTo(32.251755, 68.991454, 26.103527, 65.731463, 26.103527, 61.710060);
                crc2.bezierCurveTo(26.103527, 57.688657, 32.251755, 54.428666, 39.835979, 54.428666);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(39.912273, 55.339525);
                crc2.bezierCurveTo(47.496497, 55.339525, 53.644725, 58.599515, 53.644725, 62.620918);
                crc2.bezierCurveTo(53.644725, 66.642321, 47.496497, 69.902311, 39.912273, 69.902311);
                crc2.bezierCurveTo(32.328049, 69.902311, 26.179821, 66.642321, 26.179821, 62.620918);
                crc2.bezierCurveTo(26.179821, 58.599515, 32.328049, 55.339525, 39.912273, 55.339525);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(39.835979, 54.428666);
                crc2.bezierCurveTo(47.420203, 54.428666, 53.568431, 57.688657, 53.568431, 61.710060);
                crc2.bezierCurveTo(53.568431, 65.731463, 47.420203, 68.991454, 39.835979, 68.991454);
                crc2.bezierCurveTo(32.251755, 68.991454, 26.103527, 65.731463, 26.103527, 61.710060);
                crc2.bezierCurveTo(26.103527, 57.688657, 32.251755, 54.428666, 39.835979, 54.428666);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -38.323100, 2.171640);
                
                crc2.beginPath();
                crc2.moveTo(118.187080, 43.641275);
                crc2.bezierCurveTo(125.771304, 43.641275, 131.919532, 46.901265, 131.919532, 50.922668);
                crc2.bezierCurveTo(131.919532, 54.944071, 125.771304, 58.204062, 118.187080, 58.204062);
                crc2.bezierCurveTo(110.602856, 58.204062, 104.454628, 54.944071, 104.454628, 50.922668);
                crc2.bezierCurveTo(104.454628, 46.901265, 110.602856, 43.641275, 118.187080, 43.641275);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(118.110790, 42.730416);
                crc2.bezierCurveTo(125.695014, 42.730416, 131.843242, 45.990407, 131.843242, 50.011810);
                crc2.bezierCurveTo(131.843242, 54.033213, 125.695014, 57.293203, 118.110790, 57.293203);
                crc2.bezierCurveTo(110.526566, 57.293203, 104.378338, 54.033213, 104.378338, 50.011810);
                crc2.bezierCurveTo(104.378338, 45.990407, 110.526566, 42.730416, 118.110790, 42.730416);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -31.297200, 19.289300);
                
                crc2.beginPath();
                crc2.moveTo(109.191250, 23.268359);
                crc2.bezierCurveTo(116.775474, 23.268359, 122.923702, 26.528350, 122.923702, 30.549753);
                crc2.bezierCurveTo(122.923702, 34.571156, 116.775474, 37.831147, 109.191250, 37.831147);
                crc2.bezierCurveTo(101.607026, 37.831147, 95.458798, 34.571156, 95.458798, 30.549753);
                crc2.bezierCurveTo(95.458798, 26.528350, 101.607026, 23.268359, 109.191250, 23.268359);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(109.114950, 22.357502);
                crc2.bezierCurveTo(116.699174, 22.357502, 122.847402, 25.617492, 122.847402, 29.638895);
                crc2.bezierCurveTo(122.847402, 33.660298, 116.699174, 36.920288, 109.114950, 36.920288);
                crc2.bezierCurveTo(101.530726, 36.920288, 95.382498, 33.660298, 95.382498, 29.638895);
                crc2.bezierCurveTo(95.382498, 25.617492, 101.530726, 22.357502, 109.114950, 22.357502);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
            
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -72.175200, 13.413100);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -72.956700, 10.091400);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -75.282500, 6.762130);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -72.549700, 4.189060);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -71.219300, 0.508565);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -74.836400, -1.224070);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -73.194000, -3.740950);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.beginPath();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, 0.361314, 0.180657);
                crc2.lineWidth = 0.175948;
                crc2.moveTo(73.346714, 31.072992);
                crc2.lineTo(80.031020, 32.879561);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.beginPath();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, 0.270985, 0.451642);
                crc2.lineWidth = 0.175948;
                crc2.moveTo(76.508210, 31.614964);
                crc2.lineTo(81.205291, 25.653284);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -45.613700, 34.040200);
                
            // #path47-2-5-23
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -47.708300, 32.784800);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -44.056300, 30.250900);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -42.766100, 27.350400);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -44.933300, 25.042300);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -47.037300, 23.782300);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, -45.010400, 21.789700);
                
                crc2.beginPath();
                crc2.moveTo(152.053740, 26.972524);
                crc2.bezierCurveTo(159.637964, 26.972524, 165.786192, 30.232515, 165.786192, 34.253918);
                crc2.bezierCurveTo(165.786192, 38.275321, 159.637964, 41.535311, 152.053740, 41.535311);
                crc2.bezierCurveTo(144.469516, 41.535311, 138.321288, 38.275321, 138.321288, 34.253918);
                crc2.bezierCurveTo(138.321288, 30.232515, 144.469516, 26.972524, 152.053740, 26.972524);
                crc2.fill();
                crc2.stroke();
                
                crc2.beginPath();
                crc2.moveTo(151.977450, 26.061667);
                crc2.bezierCurveTo(159.561674, 26.061667, 165.709902, 29.321657, 165.709902, 33.343060);
                crc2.bezierCurveTo(165.709902, 37.364463, 159.561674, 40.624454, 151.977450, 40.624454);
                crc2.bezierCurveTo(144.393226, 40.624454, 138.244998, 37.364463, 138.244998, 33.343060);
                crc2.bezierCurveTo(138.244998, 29.321657, 144.393226, 26.061667, 151.977450, 26.061667);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.beginPath();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, 28.879300, 25.377900);
                crc2.lineWidth = 0.175948;
                crc2.moveTo(73.346714, 31.072992);
                crc2.lineTo(80.031020, 32.879561);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                
                crc2.save();
                crc2.beginPath();
                crc2.transform(1.000000, 0.000000, 0.000000, 1.000000, 28.789000, 25.648900);
                crc2.lineWidth = 0.175948;
                crc2.moveTo(76.508210, 31.614964);
                crc2.lineTo(81.205291, 25.653284);
                crc2.fill();
                crc2.stroke();
                crc2.restore();
                crc2.restore();
                }

            crc2.restore();
        }

        // wishBubble clicked?
        compareIceCream(_clickPoint: Vector): void {
            if ((_clickPoint.x >= -150 + this.position.x && _clickPoint.x <= -50 + this.position.x) && (_clickPoint.y >= -60 + this.position.y && _clickPoint.y <= 20 + this.position.y)) {
                switch (this.state) {
                    case customerState.sitting:
                        compare(this.desire, this);
                        break;
                    case customerState.paying:
                        payDay(this);
                        break;
                    default:
                        break;
                }
            }
        }

        // order successful, payment due
        pay(): void {
            this.state = customerState.paying;
            this.mood -= 500;
        }

        // destination: chair
        destination(_location: Vector): void {
            this.chair = _location;
            let goalX = this.chair.x - this.position.x;
            let goalY = this.chair.y - this.position.y;
            this.goal = new Vector(goalX, goalY);
            this.speed = new Vector(10, 10);
        }

        // move
        move(): void {
            let offset: Vector;
            switch (this.state) {
                case customerState.arriving:
                    // to waiting point
                    offset = new Vector(this.speed.x, this.speed.y);
                    this.position.add(offset);
                    if (this.position.x == this.waitPoint.x) {
                        this.state = customerState.waiting;
                    }
                    break;
                case customerState.sitting:
                    // to chair
                    if (this.speed.x == 0 && this.speed.y == 0) {
                        return;
                    }
                    if (this.goal.x <= 0) {
                        this.speed.x = 0;
                    } else {
                        this.goal.x -= 10;
                    }
                    if (this.goal.y <= 0) {
                        this.speed.y = 0;
                    } else {
                        this.goal.y -= 10;
                    }
                    offset = new Vector(this.speed.x, this.speed.y);
                    this.position.add(offset);
                    break;
                case customerState.leaving:
                    // away
                    if (this.goal.x >= 0) {
                        this.speed.x = 0;
                    } else {
                        this.goal.x += 10;
                    }
                    if (this.goal.y >= 0) {
                        this.speed.y = 0;
                    } else {
                        this.goal.y += 10;
                    }
                    offset = new Vector(this.speed.x, this.speed.y);
                    this.position.add(offset);
                    if (this.position.x == -40) {
                        customerLeaves(this);
                    }
                    break;
                default:
                    break;
            }
        }

        // start leaving process
        leave(): void {
            if (this.goal == undefined) {
                this.state = customerState.leaving;
                this.guestMood = customerMood.angry;
                this.goAway();
                return;
            } else if (this.goal.x >= 0 && this.goal.y >= 0) {
                // places need to be defined, position doesn´t work
                let aChair = new Vector(this.chair.x, this.chair.y);
                allChairs.push(aChair); 
                this.state = customerState.leaving;
                this.guestMood = customerMood.angry;
                this.goAway();
            }
        }

        // destination: away
        private goAway(): void {
            let door: Vector = new Vector(-40, 50);
            let goalX = door.x - this.position.x;
            let goalY = door.y - this.position.y;
            this.goal = new Vector(goalX, goalY);
            this.speed = new Vector(-10, -10);
        }

        // manage mood
        happiness(): void {
            this.mood++;
            if (this.mood > 800 && this.mood < 1300 && this.guestMood != customerMood.notHappy) {
                this.guestMood = customerMood.notHappy;
            } else if (this.mood > 1300 && this.guestMood != customerMood.angry) {
                this.guestMood = customerMood.angry;
            }
            if (this.mood == 1500) {
                this.leave();
            }
        }
    }
}