// if (!window.WebSocket) {
//     document.getElementById('res').innerHTML = 'WebSocket в этом браузере не поддерживается.';
// }
//
// var socket = new WebSocket("ws://localhost:8081");
//
// socket.onmessage = function(event) {
//     var incomingMessage = event.data;
//     showMessage(incomingMessage);
// };
//
// function showMessage(message) {
//     var res = JSON.parse(message);
//     var mesWebsocket = 'Ответ приехал по Websocket:<br>';
//     mesWebsocket += 'Фамилия: ' + res.surname + '.<br>';
//     mesWebsocket += 'Имя: ' + res.name + '.<br>';
//     mesWebsocket += 'Отчество: ' + res.mName + '.<br>';
//     mesWebsocket += 'Возраст: ' + res.age + '.<br>';
//     document.getElementById('res').innerHTML = mesWebsocket
// }
//
// socket.onerror = function(error) {
//     document.getElementById('res').innerHTML = "Произошла ошибка: " + error.data;
// };


// var form = document.forms.form_local;
// var outgoingMessage = {
//     surname: form.surname.value,
//     name: form.name.value,
//     mName: form.mName.value,
//     age: form.age.value
// };
// alert (outgoingMessage);

var xhr = new XMLHttpRequest();

xhr.open("POST", "/getAge");

xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
        return;
    }

    var res = xhr.responseText;
    // var mesAjax = 'Ответ приехал по Ajax:<br>';
    // mesAjax += 'Фамилия: ' + res.surname + '.<br>';
    // mesAjax += 'Имя: ' + res.name + '.<br>';
    // mesAjax += 'Отчество: ' + res.mName + '.<br>';
    // mesAjax += 'Возраст: ' + res.age + '.<br>';
    document.getElementById('res').innerHTML = res;
};

xhr.send('Просто строка');
