HTML:
input for task
    text box
    submit
list of tasks
    ul


CSS:
change color on complete
    change class on boolean check
background color
font & size
text color & bg color of tasks

CLIENT:
grab inputs from dom
append
    li
        name
        copmlete
            toggle class
        delete
send to server



SERVER:
GET append on submit/completed
POST submit button
PUT completed
DELETE delete

DATABASE:
weekend-to-do-app
tasks
"id" serial primary key,
"name" varchar (20),
"complete" boolean: