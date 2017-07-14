getStart();

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
    var mesWebsocket = 'Фамилия: ' + res.surname + '.<br>';
    mesWebsocket += 'Имя: ' + res.name + '.<br>';
    mesWebsocket += 'Отчество: ' + res.mName + '.<br>';
    document.getElementById('info').innerHTML = mesWebsocket
}

socket.onerror = function(error) {
    document.getElementById('info').innerHTML = "Произошла ошибка: " + error.data;
};

socket.onclose = function(event) {
    console.log("Error occurred.");
    document.getElementById("info").innerHTML = "Error: " + event;
};

function getStart() {

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/getStart");

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
            return;
        }

        var res = JSON.parse(xhr.responseText);
        var mesAjax = 'Фамилия: ' + res.surname + '.<br>';
        mesAjax += 'Имя: ' + res.name + '.<br>';
        mesAjax += 'Отчество: ' + res.mName + '.<br>';
        document.getElementById('info').innerHTML = mesAjax;
    };

    xhr.send(' ');
}


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
