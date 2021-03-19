var data;

get_info("movies");
var movies = data;
get_info("genres");
var genres = data;
get_info("directors");
var directors = data;

var search_genre = document.getElementById("search_genre");
var search_director = document.getElementById("search_director");
var search_year = document.getElementById("search_year");
var submit_btn = document.getElementById("submit_btn");

submit_btn.addEventListener("click", print_res);

start();

function get_info(category){
    var http = new XMLHttpRequest();
    var link = 'https://my-json-server.typicode.com/Lelxuch/mockjson/' + category;

    http.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                console.log("Response is recieved");
                data = JSON.parse(this.responseText);
            } else {
                console.log("Request failed");
            }
        }
    }
    http.open('GET', link, false);
    http.send();
}

function start(){
    for(var i = 0; i < genres.length; ++i){
        var option = document.createElement("option");
        option.value = genres[i].id;
        option.innerHTML = genres[i].genre;
        search_genre.appendChild(option);
    }
    for(var i = 0; i < directors.length; ++i){
        var option = document.createElement("option");
        option.value = directors[i].id;
        option.innerHTML = directors[i].full_name;
        search_director.appendChild(option);
    }
}

function print_res(){
    var final_result = [];
    for(var i = 0; i < movies.length; ++i){
        if((search_genre.value == 0 || search_genre.value == movies[i].genre_id) && ((parseInt(search_year.value, 0) <= movies[i].year && parseInt(search_year.value, 0) + 4 >= movies[i].year) || search_year.value == 0) && (search_director.value == 0 || search_director.value == movies[i].director_id)){
            var director_new_name = find_it_directors(movies[i].director_id);
            var genre_new_name = find_it_genres(movies[i].genre_id);
            var res_item = {
                title : movies[i].title,
                director_name : director_new_name,
                genre_name : genre_new_name,
                year : movies[i].year
            }
            final_result.push(res_item);
        }
    }

    tbody = document.getElementById("tbody");
    while (tbody.lastElementChild) {
        tbody.removeChild(tbody.lastElementChild);
    }
    for(var i = 0; i < final_result.length; ++i){
        var row = document.createElement("tr");
        row.className = "rows";
        tbody.appendChild(row);
        var rows = document.getElementsByClassName("rows");
        var last_row = rows[rows.length - 1];
        var current_elem = final_result[i];
        var id = document.createElement("td");
        id.innerHTML = i + 1;
        last_row.appendChild(id);
        for(var key in current_elem){
            var row_td = document.createElement("td");
            row_td.innerHTML = current_elem[key];
            last_row.appendChild(row_td);
        }
    }
}

function find_it_directors(to_find){
    for(var i = 0; i < directors.length; ++i){
        if(directors[i].id == to_find){
            return directors[i].full_name;
        }   
    }
}

function find_it_genres(to_find){
    for(var i = 0; i < genres.length; ++i){
        if(genres[i].id == to_find){
            return genres[i].genre;
        }   
    }
}