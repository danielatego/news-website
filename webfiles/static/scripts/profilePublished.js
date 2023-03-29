let created = document.getElementById("created").value;
console.log(created);
created=JSON.parse(created);
console.log(created);

let created_container = document.querySelector(".published");
let created_loadMoreButton = document.querySelector(".published button");

let created_initialItems = 3;
let created_loadItems = 3;

function loadcreatedInitialItems(){
    let books =  created;
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter < created_initialItems){
            out += `
            <div class= "pu p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
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
    created_container.insertBefore(div, created_loadMoreButton);
    div.innerHTML = out;	
}

function loadcreatedData(){
    let books = created;
    let currentDisplayedItems = document.querySelectorAll(".pu").length;
    console.log(currentDisplayedItems)
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter >= currentDisplayedItems && counter < created_loadItems + currentDisplayedItems){
            out += `
            <div class= "pu p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
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
    created_container.insertBefore(div, created_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".pu").length == created.length){
        created_loadMoreButton.style.display = "none";
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


