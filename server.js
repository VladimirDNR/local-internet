var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');

var clients = {};
var infoClient = {};
var infoC = {};

var webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function(ws) {

    var id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on('message', function(message) {

        infoClient = JSON.parse(message);

        sendInfo();
    });

    setInterval(checkInfo, 2000);

    function sendInfo() {
        for(var key in clients) {
            clients[key].send(JSON.stringify(infoClient));
        }
    }

    function checkInfo() {
        if (infoClient != infoC){
            infoC = infoClient;
            sendInfo()
        }
    }

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });

});


var fileServer = new Static.Server('.');
http.createServer(function (req, res) {

    if (req.url == '/getStart') {
        req.on('data', function(chunk) {
            res.end(JSON.stringify(infoClient));
        });
    }

    if (req.url == '/sendAjax') {
        req.on('data', function(chunk) {
            var ajaxMessage = chunk.toString();
            infoClient = JSON.parse(ajaxMessage);
            res.end(ajaxMessage);
        });
    }

    if (req.url == '/getAge') {

        req.on('data', function(chunk) {
            res.end(infoClient.age);
        });
    }
    fileServer.serve(req, res);

}).listen(8080);

console.log("Сервер запущен на портах 8080, 8081");
