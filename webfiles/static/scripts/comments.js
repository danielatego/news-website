let comment = document.getElementById("comment").value;
console.log(comment);
comment=JSON.parse(comment);
console.log(comment);

let comment_container = document.querySelector(".DivToScroll");
let comment_loadMoreButton = document.querySelector(".DivToScroll button");

let comment_initialItems = 3;
let comment_loadItems = 3;

function loadcommentInitialItems(){
    let books =  comment;
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter < comment_initialItems){
            out += `
                <div class= "p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                            <div class="row">
                                <div class="col">
                                    <p class=" fs-6 text-capitalize mb-0">${book.name}</p>
                                </div>
                                <div class="col">
                                    <p class="text-muted fw-lighter text-center mb-0" style="padding-bottom: 3px;padding-top: 3px;"> ${book.time}</p>
                                </div>
                            </div>
                            <p class="mb-1 fw-lighter"> ${book.comment} </p>
                </div>
            `;
        }
        
        counter++;
    }

    let div = document.createElement("div");
    comment_container.insertBefore(div, comment_loadMoreButton);
    div.innerHTML = out;	
}

function loadcommentData(){
    let books = comment;
    let currentDisplayedItems = document.querySelectorAll(".p-2").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter >= currentDisplayedItems && counter < comment_loadItems + currentDisplayedItems){
            out += `
            <div class= "p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                <div class="row">
                    <div class="col">
                        <p class=" fs-6 text-capitalize mb-0">${book.name}</p>
                    </div>
                    <div class="col">
                        <p class="text-muted fw-lighter text-center mb-0" style="padding-bottom: 3px;padding-top: 3px;"> ${book.time}</p>
                    </div>
                </div>
                <p class="mb-1 fw-lighter"> ${book.comment} </p>
            </div>
            `;
        }

        counter++;
    }

    let div = document.createElement("div");
    comment_container.insertBefore(div, comment_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".p-2").length == comment.length){
        comment_loadMoreButton.style.display = "none";
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


