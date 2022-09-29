var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static("."));
app.get('/', function(req, res){
    res.redirected('index.html');

})
server.listen(3000, () => {
    console.log("run server");} )
   
    
 grassArr = [];
 grassEaterArr = [];
 PredatorArr = [];
 MostOfAllArr = [];
 MenArr = [];


Grass = require("./grass");
GrassEater = require("./grassEater");
Men = require("./men");
Predator = require("./predator");
MostOfAll = require("./MostOfAll");


function generator (n,m){
 let matrix = [];


    for (var y = 0; y < n; y++) {
        matrix[y] = [];
        for (x = 0; x < m; x++) {
            matrix[y][x] = Math.floor(Math.random() * 5)+1;
        }
    }
    console.log(matrix);
   return matrix
  
}

matrix = generator(60,55)
io.sockets.emit('send matrix', matrix);



function createObject(){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y, 1);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y, 3);
                PredatorArr.push(predator)
            }
            else if (matrix[y][x] == 4) {
                var mostOfAll = new MostOfAll(x, y, 4);
                MostOfAllArr.push(mostOfAll)
            }
            else if (matrix[y][x] == 5) {
                var men = new Men(x, y, 5);
                MenArr.push(men);
            }

        }
    
    

        
    }
    io.sockets.emit('send matrix', matrix);
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();

    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].die();
    }
    for (var i in PredatorArr) {
        PredatorArr[i].mul();
        PredatorArr[i].move();
        PredatorArr[i].eat();
        PredatorArr[i].die();
    }
    for (var i in MostOfAllArr) {
        MostOfAllArr[i].mul();
        MostOfAllArr[i].move();
        MostOfAllArr[i].eat();
        MostOfAllArr[i].die();
    }
    for (var i in MenArr) {
        MenArr[i].mul();
        MenArr[i].Walking();
        MenArr[i].eat();
        MenArr[i].die();
    }
    io.sockets.emit("send matrix", matrix);
}
setInterval(game,200);

io.on('connection', function () {
    createObject()
})