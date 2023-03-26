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
            <a class="stretched-link" href="/render/${book.id}">
                <div class= "book ">
                    <div class="d-flex position-relative ">
                        <img class="bd-placeholder-img flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0">${book.title}</h5>
                            <p>${book.introduction}</p>
                           
                        </div>
                    </div>
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
    let currentDisplayedItems = document.querySelectorAll(".d-flex").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter >= currentDisplayedItems && counter < loadItems + currentDisplayedItems){
            out += `
        <a class="stretched-link" href="/render/${book.id}">
            <div class= "book">
                <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                    <div>
                        <h5 class="mt-0">${book.title}</h5>
                        <p>${book.introduction}</p>
                        
                    </div>
                </div>
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

    if(document.querySelectorAll(".d-flex").length == token_data.length){
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

