var http = new XMLHttpRequest();
var link = 'http://jsonplaceholder.typicode.com/users';

http.onreadystatechange = function(){
    if(this.readyState === 4){
        if(this.status === 200){
            console.log("Response is recieved");
            data = JSON.parse(this.responseText)
        } else {
            console.log("Request failed");
        }
    }
}

http.open('GET', link, false);
http.send();

console.log(data);

var email_input = document.getElementById("email_input");
var pswd_input = document.getElementById("password_input");

var val_res = document.getElementById("validate_res");
var result = document.getElementById("result")

function validate(){
    for(var i = 0; i < data.length; ++i){
        if(email_input.value === data[i].email  && pswd_input.value === data[i].username){
            window.alert("You logged in, follow the link:  file:///C:/Users/User/OneDrive/STudenT/%D0%A2%D1%80%D0%B8%D0%BC%D0%B5%D1%81%D1%82%D1%80%202/WEB/Final%20Project/Netflix-Cinema.html");
            result.style.display = "block";
            return true;
        }
    }
    val_res.style.display = "block";
    return false;
}