let liked = document.getElementById("liked").value;
console.log(liked);
liked=JSON.parse(liked);
console.log(liked);

let liked_container = document.querySelector(".likes");
let liked_loadMoreButton = document.querySelector(".likes button");

let liked_initialItems = 3;
let liked_loadItems = 3;

function loadlikedInitialItems(){
    let books =  liked;
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter < liked_initialItems){
            out += `
            <div class= "li p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                    <div>
                        <h5 class="mt-0">${book.title}</h5>
                        <p class="lh-sm" >${book.introduction}</p>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary stretched-link">
                                <img src="/static/icons/view.svg" alt="" width="20" height="20">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        
        counter++;
    }

    let div = document.createElement("div");
    liked_container.insertBefore(div, liked_loadMoreButton);
    div.innerHTML = out;	
}

function loadlikedData(){
    let books = liked;
    let currentDisplayedItems = document.querySelectorAll(".li").length;
    console.log(currentDisplayedItems)
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter >= currentDisplayedItems && counter < liked_loadItems + currentDisplayedItems){
            out += `
            <div class= "li p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                    <div>
                        <h5 class="mt-0">${book.title}</h5>
                        <p class="lh-sm" >${book.introduction}</p>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary stretched-link">
                                <img src="/static/icons/view.svg" alt="" width="20" height="20">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }

        counter++;
    }

    let div = document.createElement("div");
    liked_container.insertBefore(div, liked_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".li").length == liked.length){
        liked_loadMoreButton.style.display = "none";
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


