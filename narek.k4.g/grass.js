let LivingCreature = require("./LivingCreature"); 
 module.exports = class Grass extends LivingCreature {
   
    mul() {
        this.multiply++;
        var emptyCell = super.chooseCell(0);
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (this.multiply >= 5 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }


}
