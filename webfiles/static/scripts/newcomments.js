let newcomment = document.getElementById("newcomment").value;
console.log(newcomment);
newcomment=JSON.parse(newcomment);
console.log(newcomment);

let newcomment_container = document.querySelector(".newcomment");
let newcomment_loadMoreButton = document.querySelector(".newcomment button");

let newcomment_initialItems = 3;
let newcomment_loadItems = 3;

function loadnewcommentInitialItems(){
    let books =  newcomment;
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter < newcomment_initialItems){
            out += `
                <div class= "nc p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
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
    newcomment_container.insertBefore(div, newcomment_loadMoreButton);
    div.innerHTML = out;	
}

function loadnewcommentData(){
    let books = newcomment;
    let currentDisplayedItems = document.querySelectorAll(".nc").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter >= currentDisplayedItems && counter < newcomment_loadItems + currentDisplayedItems){
            out += `
            <div class= " nc p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
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
    newcomment_container.insertBefore(div, newcomment_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".nc").length == newcomment.length){
        newcomment_loadMoreButton.style.display = "none";
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


