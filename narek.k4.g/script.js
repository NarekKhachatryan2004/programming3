
var socket = io();



var side = 19;


function setup() {


    
    createCanvas(55 * side, 60 * side);
    background('#acacac');


}

socket.on("weather", function (data) {
    weath = data;
})

function nkarel(matrix) {
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            
            if (matrix[y][x] == 1) {
                
                if (weath == "winter") {
                    fill("white")
                }
                else if (weath == "spring") {
                    fill("green")
                }
                else if (weath == "summer") {
                    fill("green")
                }
                else if (weath == "autumn") {
                    fill(255,204,0)
                }
                
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            if (matrix[y][x] == 5) {
                fill('#FAEBD7')
            }
            rect(x * side, y * side, side, side);
            

        }


    }


    

   socket.on('send matrix', nkarel)
   
}

function weather() {
 socket.emit("weather")
}

