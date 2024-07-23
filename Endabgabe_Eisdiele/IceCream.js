"use strict";
var icecreamshop;
(function (icecreamshop) {
    class IceCream {
        position;
        nScoops;
        here;
        chosenTaste;
        sauceChosen;
        toppingChosen;
        constructor(_scoopNumber, _desire) {
            this.position = new icecreamshop.Vector(0, 0);
            this.nScoops = _scoopNumber;
            this.chosenTaste = _desire;
            this.sauceChosen = false;
            this.toppingChosen = false;
        }
        // where shown? in bubble or at bottom?
        where(_there) {
            switch (_there) {
                case icecreamshop.iceWhere.bottom:
                    this.position = new icecreamshop.Vector(icecreamshop.crc2.canvas.width - 250, icecreamshop.crc2.canvas.height - 160);
                    this.here = icecreamshop.iceWhere.bottom;
                    break;
                case icecreamshop.iceWhere.inBubble:
                    this.position = new icecreamshop.Vector(-100, -28);
                    this.here = icecreamshop.iceWhere.inBubble;
                    break;
                default:
                    break;
            }
        }
        // + scoops
        moreScoops(_scoopNumber, _desire) {
            if (_scoopNumber < 1 || _scoopNumber > 3) {
                return;
            }
            this.nScoops = _scoopNumber;
            this.chosenTaste = _desire;
        }
        addSauce() {
            this.sauceChosen = true;
        }
        addTopping() {
            this.toppingChosen = true;
        }
        draw(_scale) {
            icecreamshop.crc2.save();
            icecreamshop.crc2.translate(this.position.x, this.position.y);
            // 1 scoop
            if (this.nScoops == 1) {
                icecreamshop.crc2.strokeStyle = "rgb(0, 0, 0)";
                icecreamshop.crc2.fillStyle = "" + this.chosenTaste[0] + "";
                let scoop = new Path2D();
                icecreamshop.crc2.beginPath();
                scoop.arc(0, -5 * _scale, 39 * _scale, 0, 2 * Math.PI);
                icecreamshop.crc2.fill(scoop);
                // sauce + topping for bottom (needed to be adjusted)
                if (this.here == icecreamshop.iceWhere.bottom) {
                    if (this.sauceChosen == true) {
                        this.drawSauce(1.9, -185, -93);
                    }
                    if (this.toppingChosen == true) {
                        this.drawTopping(1.4, -196, -88);
                    }
                    // sauce + topping for Bubble (needed to be adjusted, differently)
                }
                else if (this.here == icecreamshop.iceWhere.inBubble) {
                    this.drawSauce(1.9 * _scale, -68, -35);
                    this.drawTopping(2.3 * _scale, -73, -33);
                }
            }
            else if (this.nScoops == 2) {
                // 2 scoops
                icecreamshop.crc2.strokeStyle = "rgb(0, 0, 0)";
                icecreamshop.crc2.fillStyle = "" + this.chosenTaste[0] + "";
                let scoop = new Path2D();
                icecreamshop.crc2.beginPath();
                scoop.arc(-10 * _scale, -5 * _scale, 29 * _scale, 0, 2 * Math.PI);
                icecreamshop.crc2.fill(scoop);
                if (this.here == icecreamshop.iceWhere.bottom) {
                    if (this.sauceChosen == true) {
                        this.drawSauce(1.4, -147, -71);
                    }
                    if (this.toppingChosen == true) {
                        this.drawTopping(1.1, -134, -61);
                    }
                }
                else if (this.here == icecreamshop.iceWhere.inBubble) {
                    this.drawSauce(1.4 * _scale, -55, -26);
                    this.drawTopping(2 * _scale, -58, -25);
                }
                icecreamshop.crc2.strokeStyle = "rgb(0, 0, 0)";
                icecreamshop.crc2.fillStyle = "" + this.chosenTaste[1] + "";
                let scoop2 = new Path2D();
                icecreamshop.crc2.beginPath();
                scoop2.moveTo(5 * _scale, -5 * _scale);
                scoop2.arc(10 * _scale, -5 * _scale, 29 * _scale, 0, 2 * Math.PI);
                icecreamshop.crc2.fill(scoop2);
                if (this.here == icecreamshop.iceWhere.bottom) {
                    if (this.sauceChosen == true) {
                        this.drawSauce(1.4, -127, -71);
                    }
                    if (this.toppingChosen == true) {
                        this.drawTopping(1.1, -111, -61);
                    }
                }
                else if (this.here == icecreamshop.iceWhere.inBubble) {
                    this.drawSauce(1.4 * _scale, -47, -26);
                    this.drawTopping(2 * _scale, -51, -25);
                }
            }
            else if (this.nScoops == 3) {
                // 3 scoops
                icecreamshop.crc2.strokeStyle = "rgb(0, 0, 0)";
                icecreamshop.crc2.fillStyle = "" + this.chosenTaste[2] + "";
                let scoop3 = new Path2D();
                icecreamshop.crc2.beginPath();
                scoop3.moveTo(0, -33 * _scale);
                scoop3.arc(0, -33 * _scale, 29 * _scale, 0, 2 * Math.PI);
                icecreamshop.crc2.fill(scoop3);
                if (this.here == icecreamshop.iceWhere.bottom) {
                    if (this.sauceChosen == true) {
                        this.drawSauce(1.4, -136, -99);
                    }
                    if (this.toppingChosen == true) {
                        this.drawTopping(1.1, -122, -89);
                    }
                }
                else if (this.here == icecreamshop.iceWhere.inBubble) {
                    this.drawSauce(1.4 * _scale, -50.5, -37);
                    this.drawTopping(2 * _scale, -54, -35);
                }
                icecreamshop.crc2.strokeStyle = "rgb(0, 0, 0)";
                icecreamshop.crc2.fillStyle = "" + this.chosenTaste[0] + "";
                let scoop = new Path2D();
                icecreamshop.crc2.beginPath();
                scoop.moveTo(-15 * _scale, -10 * _scale);
                scoop.arc(-15 * _scale, -10 * _scale, 29 * _scale, 0, 2 * Math.PI);
                icecreamshop.crc2.fill(scoop);
                if (this.here == icecreamshop.iceWhere.bottom) {
                    if (this.sauceChosen == true) {
                        this.drawSauce(1.4, -151, -75);
                    }
                    if (this.toppingChosen == true) {
                        this.drawTopping(1.1, -138, -66);
                    }
                }
                else if (this.here == icecreamshop.iceWhere.inBubble) {
                    this.drawSauce(1.4 * _scale, -57, -28);
                    this.drawTopping(2 * _scale, -60, -26);
                }
                icecreamshop.crc2.strokeStyle = "rgb(0, 0, 0)";
                icecreamshop.crc2.fillStyle = "" + this.chosenTaste[1] + "";
                let scoop2 = new Path2D();
                icecreamshop.crc2.beginPath();
                scoop2.moveTo(15 * _scale, -10 * _scale);
                scoop2.arc(15 * _scale, -10 * _scale, 29 * _scale, 0, 2 * Math.PI);
                icecreamshop.crc2.fill(scoop2);
                if (this.here == icecreamshop.iceWhere.bottom) {
                    if (this.sauceChosen == true) {
                        this.drawSauce(1.4, -122, -75);
                    }
                    if (this.toppingChosen == true) {
                        this.drawTopping(1.1, -106, -66);
                    }
                }
                else if (this.here == icecreamshop.iceWhere.inBubble) {
                    this.drawSauce(1.4 * _scale, -44, -28);
                    this.drawTopping(2 * _scale, -49, -26);
                }
            }
            icecreamshop.crc2.fillStyle = "rgb(250, 250, 250)";
            icecreamshop.crc2.fillRect(-50 * _scale, 0, 100 * _scale, 100 * _scale);
            // scone
            icecreamshop.crc2.strokeStyle = "rgb(0, 0, 0)";
            icecreamshop.crc2.fillStyle = "rgb(252, 202, 129)";
            let scone = new Path2D();
            icecreamshop.crc2.beginPath();
            scone.moveTo(40 * _scale, 0);
            scone.lineTo(0, 120 * _scale);
            scone.lineTo(-40 * _scale, 0);
            scone.lineTo(40 * _scale, 0);
            icecreamshop.crc2.fill(scone);
            icecreamshop.crc2.restore();
        }
        // extra because length
        drawSauce(_scale, _x, _y) {
            icecreamshop.crc2.save();
            icecreamshop.crc2.translate(_x, _y);
            icecreamshop.crc2.lineWidth = 0.070004;
            let sauce = new Path2D();
            icecreamshop.crc2.beginPath();
            switch (this.nScoops) {
                case 1:
                    icecreamshop.crc2.fillStyle = "" + this.chosenTaste[1] + "";
                    break;
                case 2:
                    icecreamshop.crc2.fillStyle = "" + this.chosenTaste[2] + "";
                    break;
                case 3:
                    icecreamshop.crc2.fillStyle = "" + this.chosenTaste[3] + "";
                    break;
                default:
                    break;
            }
            sauce.moveTo(76.901732 * _scale, 43.560616 * _scale);
            sauce.bezierCurveTo(77.368834 * _scale, 39.673319 * _scale, 78.974559 * _scale, 35.929728 * _scale, 81.469170 * _scale, 32.912083 * _scale);
            sauce.bezierCurveTo(83.963782 * _scale, 29.894439 * _scale, 87.338563 * _scale, 27.613283 * _scale, 91.068637 * _scale, 26.423403 * _scale);
            sauce.bezierCurveTo(94.798711 * _scale, 25.233523 * _scale, 98.871045 * _scale, 25.139075 * _scale, 102.652270 * _scale, 26.154751 * _scale);
            sauce.bezierCurveTo(106.433500 * _scale, 27.170426 * _scale, 109.910400 * _scale, 29.292675 * _scale, 112.542230 * _scale, 32.191425 * _scale);
            sauce.bezierCurveTo(114.685020 * _scale, 34.551542 * _scale, 116.256450 * _scale, 37.390112 * _scale, 117.396500 * _scale, 40.367023 * _scale);
            sauce.bezierCurveTo(117.626170 * _scale, 40.966748 * _scale, 117.841580 * _scale, 41.586028 * _scale, 117.854320 * _scale, 42.228100 * _scale);
            sauce.bezierCurveTo(117.860320 * _scale, 42.549137 * _scale, 117.815020 * _scale, 42.873248 * _scale, 117.698760 * _scale, 43.172555 * _scale);
            sauce.bezierCurveTo(117.582480 * _scale, 43.471862 * _scale, 117.393720 * _scale, 43.745733 * _scale, 117.141020 * _scale, 43.943846 * _scale);
            sauce.bezierCurveTo(116.860560 * _scale, 44.163723 * _scale, 116.508420 * _scale, 44.284184 * _scale, 116.152890 * _scale, 44.308750 * _scale);
            sauce.bezierCurveTo(115.797360 * _scale, 44.333320 * _scale, 115.438780 * _scale, 44.264910 * _scale, 115.106460 * _scale, 44.136184 * _scale);
            sauce.bezierCurveTo(114.441830 * _scale, 43.878742 * _scale, 113.893710 * _scale, 43.393079 * _scale, 113.384260 * _scale, 42.894614 * _scale);
            sauce.bezierCurveTo(112.874810 * _scale, 42.396148 * _scale, 112.380790 * _scale, 41.869026 * _scale, 111.773130 * _scale, 41.496521 * _scale);
            sauce.bezierCurveTo(111.469300 * _scale, 41.310269 * _scale, 111.138010 * _scale, 41.164547 * _scale, 110.788850 * _scale, 41.093191 * _scale);
            sauce.bezierCurveTo(110.439690 * _scale, 41.021841 * _scale, 110.071890 * _scale, 41.026761 * _scale, 109.731870 * _scale, 41.133481 * _scale);
            sauce.bezierCurveTo(109.336210 * _scale, 41.257668 * _scale, 108.992020 * _scale, 41.514458 * _scale, 108.710990 * _scale, 41.819394 * _scale);
            sauce.bezierCurveTo(108.429950 * _scale, 42.124330 * _scale, 108.206960 * _scale, 42.477475 * _scale, 107.994230 * _scale, 42.833444 * _scale);
            sauce.bezierCurveTo(107.781500 * _scale, 43.189414 * _scale, 107.576590 * _scale, 43.551556 * _scale, 107.326050 * _scale, 43.882004 * _scale);
            sauce.bezierCurveTo(107.075500 * _scale, 44.212452 * _scale, 106.775270 * _scale, 44.512963 * _scale, 106.410540 * _scale, 44.710305 * _scale);
            sauce.bezierCurveTo(106.022410 * _scale, 44.920310 * _scale, 105.572220 * _scale, 45.005335 * _scale, 105.131630 * _scale, 44.980329 * _scale);
            sauce.bezierCurveTo(104.691040 * _scale, 44.955319 * _scale, 104.259970 * _scale, 44.823080 * _scale, 103.866810 * _scale, 44.622660 * _scale);
            sauce.bezierCurveTo(103.080480 * _scale, 44.221820 * _scale, 102.457730 * _scale, 43.563281 * _scale, 101.900240 * _scale, 42.879041 * _scale);
            sauce.bezierCurveTo(101.342740 * _scale, 42.194801 * _scale, 100.829770 * _scale, 41.467943 * _scale, 100.184650 * _scale, 40.865612 * _scale);
            sauce.bezierCurveTo(99.539522 * _scale, 40.263280 * _scale, 98.732534 * _scale, 39.784225 * _scale, 97.851704 * _scale, 39.728300 * _scale);
            sauce.bezierCurveTo(97.179343 * _scale, 39.685610 * _scale, 96.501523 * _scale, 39.896747 * _scale, 95.943269 * _scale, 40.273899 * _scale);
            sauce.bezierCurveTo(95.385015 * _scale, 40.651051 * _scale, 94.943531 * _scale, 41.187869 * _scale, 94.635438 * _scale, 41.787010 * _scale);
            sauce.bezierCurveTo(94.019251 * _scale, 42.985291 * _scale, 93.937599 * _scale, 44.387312 * _scale, 94.019395 * _scale, 45.732256 * _scale);
            sauce.bezierCurveTo(94.054265 * _scale, 46.305617 * _scale, 94.116515 * _scale, 46.880344 * _scale, 94.072595 * _scale, 47.453083 * _scale);
            sauce.bezierCurveTo(94.028675 * _scale, 48.025821 * _scale, 93.869303 * _scale, 48.606694 * _scale, 93.508417 * _scale, 49.053594 * _scale);
            sauce.bezierCurveTo(93.243827 * _scale, 49.381246 * _scale, 92.878470 * _scale, 49.623783 * _scale, 92.477995 * _scale, 49.754104 * _scale);
            sauce.bezierCurveTo(92.077520 * _scale, 49.884426 * _scale, 91.643421 * _scale, 49.903838 * _scale, 91.229921 * _scale, 49.823954 * _scale);
            sauce.bezierCurveTo(90.402921 * _scale, 49.664186 * _scale, 89.681702 * _scale, 49.110968 * _scale, 89.217765 * _scale, 48.407961 * _scale);
            sauce.bezierCurveTo(88.753829 * _scale, 47.704954 * _scale, 88.530668 * _scale, 46.863269 * _scale, 88.469756 * _scale, 46.023182 * _scale);
            sauce.bezierCurveTo(88.408846 * _scale, 45.183096 * _scale, 88.502946 * _scale, 44.339431 * _scale, 88.631209 * _scale, 43.506963 * _scale);
            sauce.bezierCurveTo(88.887745 * _scale, 41.842028 * _scale, 89.280079 * _scale, 40.128253 * _scale, 88.857332 * _scale, 38.497577 * _scale);
            sauce.bezierCurveTo(88.645959 * _scale, 37.682238 * _scale, 88.219952 * _scale, 36.906535 * _scale, 87.567843 * _scale, 36.373422 * _scale);
            sauce.bezierCurveTo(87.241789 * _scale, 36.106865 * _scale, 86.862140 * _scale, 35.903776 * _scale, 86.455400 * _scale, 35.794571 * _scale);
            sauce.bezierCurveTo(86.048659 * _scale, 35.685366 * _scale, 85.614923 * _scale, 35.671352 * _scale, 85.205075 * _scale, 35.768251 * _scale);
            sauce.bezierCurveTo(84.711737 * _scale, 35.884883 * _scale, 84.262260 * _scale, 36.160170 * _scale, 83.907570 * _scale, 36.522358 * _scale);
            sauce.bezierCurveTo(83.552879 * _scale, 36.884545 * _scale, 83.290455 * _scale, 37.331135 * _scale, 83.111799 * _scale, 37.805547 * _scale);
            sauce.bezierCurveTo(82.754486 * _scale, 38.754371 * _scale, 82.730047 * _scale, 39.792902 * _scale, 82.753000 * _scale, 40.806516 * _scale);
            sauce.bezierCurveTo(82.775950 * _scale, 41.820130 * _scale, 82.841180 * _scale, 42.844302 * _scale, 82.649454 * _scale, 43.839883 * _scale);
            sauce.bezierCurveTo(82.553594 * _scale, 44.337674 * _scale, 82.392618 * _scale, 44.825830 * _scale, 82.140701 * _scale, 45.265743 * _scale);
            sauce.bezierCurveTo(81.888784 * _scale, 45.705655 * _scale, 81.543522 * _scale, 46.096577 * _scale, 81.117274 * _scale, 46.370982 * _scale);
            sauce.bezierCurveTo(80.616121 * _scale, 46.693609 * _scale, 80.008088 * _scale, 46.846799 * _scale, 79.413840 * _scale, 46.800850 * _scale);
            sauce.bezierCurveTo(78.819592 * _scale, 46.754900 * _scale, 78.242539 * _scale, 46.510195 * _scale, 77.795936 * _scale, 46.115494 * _scale);
            sauce.bezierCurveTo(77.442762 * _scale, 45.803364 * _scale, 77.171312 * _scale, 45.399559 * _scale, 77.015607 * _scale, 44.954685 * _scale);
            sauce.bezierCurveTo(76.859901 * _scale, 44.509812 * _scale, 76.820287 * _scale, 44.024863 * _scale, 76.901730 * _scale, 43.560618 * _scale);
            sauce.closePath();
            icecreamshop.crc2.fill(sauce);
            icecreamshop.crc2.restore();
        }
        // extra because length
        drawTopping(_scale, _x, _y) {
            icecreamshop.crc2.save();
            icecreamshop.crc2.translate(_x, _y);
            switch (this.nScoops) {
                case 1:
                    icecreamshop.crc2.fillStyle = "" + this.chosenTaste[2] + "";
                    break;
                case 2:
                    icecreamshop.crc2.fillStyle = "" + this.chosenTaste[3] + "";
                    break;
                case 3:
                    icecreamshop.crc2.fillStyle = "" + this.chosenTaste[4] + "";
                    break;
                default:
                    break;
            }
            icecreamshop.crc2.lineWidth = 0.572823;
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(-0.299324 * _scale, 0.954152 * _scale, -0.954152 * _scale, -0.299324 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(-7.109821 * _scale, -114.603000 * _scale, 2.522939 * _scale, 0.447103 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.909297 * _scale, -0.416147 * _scale, 0.416147 * _scale, 0.909297 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(83.377647 * _scale, 67.941010 * _scale, 2.522939 * _scale, 0.447103 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.859881 * _scale, -0.510495 * _scale, 0.510495 * _scale, 0.859881 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(68.643829 * _scale, 70.407272 * _scale, 2.522939 * _scale, 0.447103 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.880992 * _scale, -0.473131 * _scale, 0.000000 * _scale, 1.000000 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(96.586342 * _scale, 79.258904 * _scale, 2.863747 * _scale, 0.447103 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(-0.075386 * _scale, -0.997154 * _scale, 0.997154 * _scale, -0.075386 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(-39.047779 * _scale, 88.721352 * _scale, 2.522939 * _scale, 0.447103 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.649354 * _scale, -0.760486 * _scale, 0.760486 * _scale, 0.649354 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(38.433380 * _scale, 96.104507 * _scale, 2.522939 * _scale, 0.447103 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.972007 * _scale, 0.234954 * _scale, -0.234954 * _scale, 0.972007 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(114.132790 * _scale, 5.267094 * _scale, 2.522939 * _scale, 0.447103 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.316671 * _scale, -0.948536 * _scale, 0.948536 * _scale, 0.316671 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(0.375140 * _scale, 118.034420 * _scale, 2.522939 * _scale, 0.447103 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(-0.302536 * _scale, -0.953138 * _scale, 0.953138 * _scale, -0.302536 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(-63.049770 * _scale, 87.770088 * _scale, 2.522939 * _scale, 0.447103 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.776501 * _scale, 0.630116 * _scale, -0.630116 * _scale, 0.776501 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(95.483437 * _scale, -42.605083 * _scale, 2.709854 * _scale, 0.541971 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.827407 * _scale, 0.561603 * _scale, -0.561603 * _scale, 0.827407 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(94.634445 * _scale, -27.589279 * _scale, 2.709854 * _scale, 0.541971 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.718483 * _scale, -0.695544 * _scale, 0.695544 * _scale, 0.718483 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(40.218250 * _scale, 91.829048 * _scale, 2.709854 * _scale, 0.541971 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.991351 * _scale, -0.131237 * _scale, 0.131237 * _scale, 0.991351 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(99.991554 * _scale, 46.396057 * _scale, 2.709854 * _scale, 0.541971 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.894050 * _scale, -0.447967 * _scale, 0.447967 * _scale, 0.894050 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(86.009995 * _scale, 77.911469 * _scale, 2.709854 * _scale, 0.541971 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.949973 * _scale, 0.312332 * _scale, -0.312332 * _scale, 0.949973 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(110.166280 * _scale, -7.896353 * _scale, 2.709854 * _scale, 0.541971 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.972945 * _scale, -0.231036 * _scale, 0.231036 * _scale, 0.972945 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(92.074280 * _scale, 46.963367 * _scale, 2.709854 * _scale, 0.541971 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.984855 * _scale, -0.173378 * _scale, 0.173378 * _scale, 0.984855 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(91.230034 * _scale, 45.711487 * _scale, 2.709854 * _scale, 0.541971 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.893251 * _scale, -0.449558 * _scale, 0.449558 * _scale, 0.893251 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(58.228500 * _scale, 71.286766 * _scale, 2.709854 * _scale, 0.541971 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.771873 * _scale, 0.635776 * _scale, -0.483903 * _scale, 0.875122 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(106.791080 * _scale, -37.486076 * _scale, 2.293560 * _scale, 0.258384 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.957969 * _scale, 0.286872 * _scale, -0.286872 * _scale, 0.957969 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(96.962257 * _scale, 6.147088 * _scale, 2.746491 * _scale, 0.287423 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.384688 * _scale, -0.923046 * _scale, 0.923046 * _scale, 0.384688 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(-1.662899 * _scale, 89.982338 * _scale, 2.746491 * _scale, 0.287423 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.920746 * _scale, 0.390162 * _scale, -0.390162 * _scale, 0.920746 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(91.648079 * _scale, -5.480823 * _scale, 2.746491 * _scale, 0.287423 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.877339 * _scale, -0.479871 * _scale, 0.479871 * _scale, 0.877339 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(61.776764 * _scale, 67.681694 * _scale, 2.746491 * _scale, 0.287423 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.990832 * _scale, 0.135097 * _scale, -0.135097 * _scale, 0.990832 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(94.540688 * _scale, 13.487719 * _scale, 2.746491 * _scale, 0.287423 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.942694 * _scale, 0.333657 * _scale, -0.333657 * _scale, 0.942694 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(100.870040 * _scale, -9.104388 * _scale, 2.746491 * _scale, 0.287423 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.680489 * _scale, -0.732758 * _scale, 0.732758 * _scale, 0.680489 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(49.006874 * _scale, 97.588470 * _scale, 2.746491 * _scale, 0.287423 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.942863 * _scale, -0.333180 * _scale, 0.333180 * _scale, 0.942863 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(95.577980 * _scale, 69.004089 * _scale, 2.746491 * _scale, 0.287423 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.save();
            icecreamshop.crc2.beginPath();
            icecreamshop.crc2.transform(0.907500 * _scale, 0.420052 * _scale, -0.420052 * _scale, 0.907500 * _scale, 0.000000 * _scale, 0.000000);
            icecreamshop.crc2.rect(119.251780 * _scale, -17.512259 * _scale, 2.746491 * _scale, 0.287423 * _scale);
            icecreamshop.crc2.fill();
            icecreamshop.crc2.restore();
            icecreamshop.crc2.restore();
        }
    }
    icecreamshop.IceCream = IceCream;
})(icecreamshop || (icecreamshop = {}));
//# sourceMappingURL=IceCream.js.map