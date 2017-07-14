if (!window.WebSocket) {
    document.getElementById('resWebsocket').innerHTML = 'WebSocket в этом браузере не поддерживается.';
}

var socket = new WebSocket("ws://localhost:8081");

socket.onmessage = function(event) {
    var incomingMessage = event.data;
    showMessage(incomingMessage);
};

function showMessage(message) {
    var res = JSON.parse(message);
    var mesWebsocket = 'Ответ приехал по Websocket:<br>';
    mesWebsocket += 'Фамилия: ' + res.surname + '.<br>';
    mesWebsocket += 'Имя: ' + res.name + '.<br>';
    mesWebsocket += 'Отчество: ' + res.mName + '.<br>';
    mesWebsocket += 'Возраст: ' + res.age + '.<br>';
    document.getElementById('resWebsocket').innerHTML = mesWebsocket
}

socket.onerror = function(error) {
    document.getElementById('resWebsocket').innerHTML = "Произошла ошибка: " + error.data;
};


