$(document).ready(onReady)
function onReady() {
    console.log('jq');
    $('#buttonSubmit').on('click', submitTask); // listening to submit button
    $('#listBody').on('click', '.completeBtn', completeTask); // listening to potential complete buttons
    $('#listBody').on('click', '.deleteBtn', deleteTask); // listening to potential delete buttons

    getTasks();
} // end onReady

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
} // end submitTask/POST

function getTasks() {
    $("#listBody").empty();
    $.ajax({
        type: 'GET',
        url: '/taskList'
    }).then(function (response) {
        console.log("skjfhsd", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            if (response[i].complete){  // checking if complete or not, setting class accordingly
            $('#listBody').append(`
                <tr data-id=${response[i].id} class=complete>
                    <td>${response[i].name}</td>
                    <td>YES!</td>
                    <td><button class="deleteBtn">delete</button></td>
                    <td>
                        <input type="checkbox" id="completed" checked>
                    </td>
                </tr>
            `);}
            else{
            $('#listBody').append(`
                <tr data-id=${response[i].id} class=incomplete>
                    <td>${response[i].name}</td>
                    <td>NOT YET!</td>
                    <td><button class="deleteBtn">delete</button></td>
                    <td><button data-completeStatus=${response[i].complete} class="completeBtn">complete</button></td>
                    <td>
                        <input type="checkbox" id="completed">
                    </td>
                </tr>
            `);}
        }
    });
} // end getTasks/GET

function deleteTask(){
    console.log('clicked');
    let taskId = $(this).closest('tr').data('id');
    console.log(taskId);
    $.ajax({
        method: 'DELETE',
        url: `/taskList/${taskId}`
    }).then( function(response){
        console.log(response);
        getTasks();
    }).catch(function(error){
        console.log('error', error);
    });

} // end deleteTask/DELETE

function completeTask(){
    let completeStatus = $(this).data('completeStatus');
    let taskId = $(this).closest('tr').data('id');
    console.log("clicked", completeStatus, taskId);
    $.ajax({
        method: 'PUT',
        url: `/taskList/complete/${taskId}`,
        data: {complete: completeStatus}
    }).then(function (response){
        console.log('response', response);
        getTasks();
    }).catch(function(error){
        console.log('error in put', error);
    });

} // end completeTask/PUT
