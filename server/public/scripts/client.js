$(document).ready(onReady)
function onReady() {
    console.log('jq');
    $('#buttonSubmit').on('click', submitTask);
    getTasks();
}

function submitTask() {
    let payloadObject = {
        name: $('#taskInput').val(),
        complete: false
    }
    $.ajax({
        type: 'POST',
        url: '/taskList',
        data: payloadObject
    }).then( function (response) {
        $('#taskInput').val(''),
        getTasks();
    });
}

function getTasks() {
    $("#listBody").empty();
    $.ajax({
        type: 'GET',
        url: '/taskList'
    }).then(function (response) {
        console.log("skjfhsd", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#listBody').append(`
                <tr data-id=${response[i].id}>
                    <td>${response[i].name}</td>
                    <td>${response[i].complete}</td>
                    <td><button class="deleteBtn">delete</button></td>
                    <td>
                        <input type="checkbox" id="completed" checked>
                    </td>
                    </tr>
            `);
        }
    });
};
console.log('js')
