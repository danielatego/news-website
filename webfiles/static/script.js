// fetch("books.json")
// .then(response => response.json())
// .then(books => {
// 	localStorage.setItem("books", JSON.stringify(books));
// });
let token_data = document.getElementById("genre").value;
console.log(token_data);
token_data=JSON.parse(token_data);
console.log(token_data);

let container = document.querySelector(".content");
let loadMoreButton = document.querySelector(".content button");

let initialItems = 3;
let loadItems = 3;

function loadInitialItems(){
    let books =  token_data;
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter < initialItems){
            out += `
            <a class="book" href="/render/${book.id}">
                <div class="left">
                    <img src="/static/${book.image}">
                </div>
                <div class="right ">
                    <p class="title d-block text-truncate" style="max-width: 300px;">${book.title}</p>
                    <p class="about d-block text-truncate text-wrap" style="max-width: 700px;">${book.introduction}</p>
                    <p class="info">Genre: ${book.genre} / publication: ${book.contentreg} </p>
                </div>
            </a>
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    container.insertBefore(div, loadMoreButton);
    div.innerHTML = out;	
}

function loadData(){
    let books = token_data;
    let currentDisplayedItems = document.querySelectorAll(".book").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter >= currentDisplayedItems && counter < loadItems + currentDisplayedItems){
            out += `
            <a class="book" href="/render/${book.id}">
                <div class="left">
                    <img src="/static/${book.image}">
                </div>
                <div class="right">
                    <p class="title">${book.title}</p>
                    <p class="about">${book.introduction}</p>
                    <p class="info">Genre: ${book.genre} / publication: ${book.contentreg} </p>
                </div>
            </a>
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    container.insertBefore(div, loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".book").length == token_data.length){
        loadMoreButton.style.display = "none";
    }

    fadeIn(div);
}

function fadeIn(div){
    let opacity = 0;
    let interval = setInterval(function(){
        if (opacity <= 1) {
            opacity = opacity + 0.1;
            div.style.opacity = opacity;
        }else{
            clearInterval(interval);
        } 
    }, 30);
}

// window.onscroll = function(ev) {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//        loadData();
//     }
// };