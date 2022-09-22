var express = require('experss');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static("."));
app.get('/', function(req, res){
    res.redirected('index.html');

})
server.listen(3000, () => {
    console.log("run server");} )