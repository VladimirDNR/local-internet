if (!window.WebSocket) {
    document.getElementById('info').innerHTML = 'WebSocket в этом браузере не поддерживается.';
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
    document.getElementById('info').innerHTML = mesWebsocket
}

socket.onerror = function(error) {
    document.getElementById('info').innerHTML = "Произошла ошибка: " + error.data;
};


function ageSurvey() {

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/getAge");

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
            return;
        }

        var res = 'Ваш возраст: ' + xhr.responseText;
        document.getElementById('res').innerHTML = res;
    };

    xhr.send(' ');
}
setInterval(ageSurvey, 1000);
