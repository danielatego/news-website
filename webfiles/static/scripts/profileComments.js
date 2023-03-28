let comments = document.getElementById("comments").value;
console.log(comments);
comments=JSON.parse(comments);
console.log(comments);

let comments_container = document.querySelector(".comments");
let comments_loadMoreButton = document.querySelector(".comments button");

let comments_initialItems = 3;
let comments_loadItems = 3;

function loadcommentsInitialItems(){
    let books =  comments;
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter < comments_initialItems){
            out += `
                <div class= "p-2 mb-2 bg-secondary-subtle text-emphasis-dark  rounded-4 row-gap-3" >
                        <div class="row">
                            <div class="col">
                                <p class=" fs-6 text-capitalize mb-0">${book.name}</p>
                            </div>
                            <div class="col">
                                <p class="text-muted fw-lighter text-center mb-0" style="padding-bottom: 3px;padding-top: 3px;"> ${book.time}</p>
                            </div>
                            <p class="mb-1 fw-lighter"> ${book.comment} </p>
                        </div>
                        <div class="d-grid gap-1 col-2 mx-auto text-center " >
                            <a href="/render/${book.content}" class="btn btn-sm btn-block btn-primary p-0 rounded-4" role="button">reply</a> 
                        </div>
                </div>
            `;
        }
        
        counter++;
    }

    let div = document.createElement("div");
    comments_container.insertBefore(div, comments_loadMoreButton);
    div.innerHTML = out;	
}

function loadcommentsData(){
    let books = comments;
    let currentDisplayedItems = document.querySelectorAll(".p-2").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter >= currentDisplayedItems && counter < comments_loadItems + currentDisplayedItems){
            out += `
            <div class= "p-2 mb-2 bg-secondary-subtle text-emphasis-dark  rounded-4 row-gap-3" >
                <div class="row">
                    <div class="col">
                        <p class=" fs-6 text-capitalize mb-0">${book.name}</p>
                    </div>
                    <div class="col">
                        <p class="text-muted fw-lighter text-center mb-0" style="padding-bottom: 3px;padding-top: 3px;"> ${book.time}</p>
                    </div>
                    <p class="mb-1 fw-lighter"> ${book.comment} </p>
                </div>
                <div class="d-grid gap-1 col-2 mx-auto text-center " >
                    <a href="/render/${book.content}" class="btn btn-sm btn-block btn-primary p-0 rounded-4" role="button">reply</a> 
                </div>
            </div>
            `;
        }

        counter++;
    }

    let div = document.createElement("div");
    comments_container.insertBefore(div, comments_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".p-2").length == comments.length){
        comments_loadMoreButton.style.display = "none";
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


