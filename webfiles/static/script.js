let token_data = document.getElementById("genre").value;
token_data=JSON.parse(token_data);

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
            
            <div class= "curren book ">
                <div class="d-flex position-relative bg-secondary-subtle rounded p-2 shadow-sm ">
                    <img class="bd-placeholder-img flex-shrink-0 me-3 rounded" width="144" height="96" src="/static/${book.image}" >
                    <div>
                        <h5 class="fs-5 fw-semibold text-capitalize">${book.title}</h5>
                        <p class="lead lh-sm fs-6 fw-normal mb-0">${book.introduction}</p>
                        <a class="stretched-link" href="/render/${book.id}"> </a>
                    </div>
                </div>
            </div>
           
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
    let currentDisplayedItems = document.querySelectorAll(".curren").length;
    console.log(currentDisplayedItems)
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter >= currentDisplayedItems && counter < loadItems + currentDisplayedItems){
            out += `
        
                <div class= "curren book ">
                    <div class="d-flex position-relative bg-secondary-subtle rounded p-2 shadow-sm ">
                        <img class="bd-placeholder-img flex-shrink-0 me-3 rounded" width="144" height="96" src="/static/${book.image}" >
                        <div>
                            <h5 class="fs-5 fw-semibold text-capitalize">${book.title}</h5>
                            <p class="lead lh-sm fs-6 fw-normal mb-0">${book.introduction}</p>
                            <a class="stretched-link" href="/render/${book.id}"> </a>
                        </div>
                    </div>
                </div>
        
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    container.insertBefore(div, loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".curren").length == token_data.length){
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

