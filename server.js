var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = {};
var age = '';

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function(ws) {

    var id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on('message', function(message) {
        var res = JSON.parse(message);
        console.log('В полученом сообщении фамилия: ' + res.surname);
        console.log('В полученом сообщении имя: ' + res.name);
        console.log('В полученом сообщении отчество: ' + res.mName);
        console.log('В полученом сообщении возраст: ' + res.age);
        age = res.age;

        for(var key in clients) {
            clients[key].send(JSON.stringify(res));
        }
    });

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });

});


// обычный сервер (статика) на порту 8080
var fileServer = new Static.Server('.');
http.createServer(function (req, res) {
    if (req.url == '/sendAjax') {
        req.on('data', function(chunk) {
            var ajaxMessage = chunk.toString();
            age = JSON.parse(ajaxMessage).age;
            console.log('Ajax с сервера отправляет: ' + ajaxMessage);
            res.end(ajaxMessage);
        });

    }
    if (req.url == '/getAge') {

        req.on('data', function(chunk) {
            // ajaxMessage = chunk.toString();
            console.log('Ajax с сервера отправляет: ' + age);
            res.end(age);
        });

    }
    fileServer.serve(req, res);

}).listen(8080);

console.log("Сервер запущен на портах 8080, 8081");
