function sendAjax(){
    var form = document.forms.form_local;
    var outgoingMessage = {
        surname: form.surname.value,
        name: form.name.value,
        mName: form.mName.value,
        age: form.age.value
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/sendAjax");

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
            return;
        }

        var res = JSON.parse(xhr.responseText);
        var mesAjax = 'Ответ приехал по Ajax:<br>';
        mesAjax += 'Фамилия: ' + res.surname + '.<br>';
        mesAjax += 'Имя: ' + res.name + '.<br>';
        mesAjax += 'Отчество: ' + res.mName + '.<br>';
        mesAjax += 'Возраст: ' + res.age + '.<br>';
        document.getElementById('resAjax').innerHTML = mesAjax;
    };

    xhr.send(JSON.stringify(outgoingMessage));
}

//
// if (!window.WebSocket) {
//     document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
// }
//
// var socket = new WebSocket("ws://localhost:8081");
//
// document.forms.form_local.onsubmit = function() {
//     var outgoingMessage = {
//         surname: this.surname.value,
//         name: this.name.value,
//         mName: this.mName.value,
//         age: this.age.value
//     };
//     socket.send(JSON.stringify(outgoingMessage));
//     return false;
// };
//
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
//     document.getElementById('resWebsocket').innerHTML = mesWebsocket
// }