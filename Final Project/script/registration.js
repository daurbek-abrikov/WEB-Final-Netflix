var users;

var email_done = false;
var pswd_done = false;

var email_input = document.getElementById("email_input");
var email_res = document.getElementById("email_res");

var pswd_input = document.getElementById("password_input");
var pswd_res = document.getElementById("password_res");
var pswd_last;

var rep_pswd_input = document.getElementById("rep_password_input");
var rep_pswd_res = document.getElementById("rep_password_res");

var full_name_input = document.getElementById("full_name_input");

email_input.addEventListener('input', email_check)
pswd_input.addEventListener('input', password_check);
rep_pswd_input.addEventListener('input', rep_password_check);

get_info();

function email_check(){
    var email_pattern = /[\w-\.]+@+(gmail.com|mail.ru|outlook.com)/gi;
    if(email_pattern.test(this.value)){
        email_done = true;
        email_res.innerHTML = "Email is correct";
        email_res.style.color = "#3bcc62";
    } else{
        email_done = false;
        email_res.innerHTML = "Email is incorrect";
        email_res.style.color = "#d13838";
    }
}

function password_check(){
    pswd_pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}/gi;
    if(pswd_pattern.test(this.value)){
        pswd_res.innerHTML = "Password is correct";
        pswd_res.style.color = "#3bcc62";
        rep_pswd_input.disabled = false;
    } else{
        pswd_res.innerHTML = "Password must consists(1 uppercase, 1 lowercase, 1 number and 1 special digit)";
        pswd_res.style.color = "#d13838";
        rep_pswd_input.disabled = true;
    }
    if(rep_pswd_input.value != ""){
        rep_password_check();
    }
}

function rep_password_check(){
    if(pswd_input.value === this.value){
        pswd_done = true;
        rep_pswd_res.innerHTML = "Passwords match";
        rep_pswd_res.style.color = "#3bcc62";
    } else{
        pswd_done = false;
        rep_pswd_res.innerHTML = "Passwords don't match";
        rep_pswd_res.style.color = "#d13838";
    }
}

/* JjJjJj2@ */
/* GgGgGg3# */

function validate(){
    if(email_done && pswd_done){
        postRequest();
        return true;
    } else{
        return false;
    }
}

function get_info(){
    var http = new XMLHttpRequest();
    var link = 'https://my-json-server.typicode.com/Lelxuch/mockjson/users';

    http.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                console.log("Response is recieved");
                users = JSON.parse(this.responseText)
            } else {
                console.log("Request failed");
            }
        }
    }

    http.open('GET', link, false);
    http.send();
}

function postRequest(){
    var http = new XMLHttpRequest();

    var new_id = users.length + 1;
	var user_email = email_input.value;
	var user_password = pswd_input.value;
    var new_full_name = full_name_input.value;

    var user = {
        id : new_id,
        email : user_email,
        password : user_password,
        full_name : new_full_name
    }

    console.log(user);

    http.open("POST", 'https://my-json-server.typicode.com/Lelxuch/mockjson/users', false);

    http.setRequestHeader("Content-Type", "application/json");

    http.onreadystatechange = function(){
        console.log("Status: ", http.status);
        if(http.readyState === 4 && http.status === 201){
            window.alert("Success");
        }
    }
    var data = JSON.stringify(user);
    http.send(data);
}