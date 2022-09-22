let LivingCreature = require("./LivingCreature"); 
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
       super(x,y);
        this.energy = 8;

        this.index = index;
    }
    
    move() {

        var emptyCell = super.chooseCell(0);
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

        if (newCell) {
            this.energy--;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }

    eat() {
        var emptyCell = super.chooseCell(1);
        var grass = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (grass) {
            var x = grass[0];
            var y = grass[1];
            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }



            this.x = x;
            this.y = y;
            this.energy += 2;

        }

    }

    mul() {

         var emptyCell = super.chooseCell(0);
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (this.energy >= 6 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;

        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y)
                    grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
