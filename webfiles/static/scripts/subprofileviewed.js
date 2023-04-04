let createdi = document.getElementById("createdi").value;
console.log(createdi);
createdi=JSON.parse(createdi);
console.log(createdi);

let createdi_container = document.querySelector(".newcomment");
let createdi_loadMoreButton = document.querySelector(".newcomment button");

let createdi_initialItems = 3;
let createdi_loadItems = 3;

function loadcreatediInitialItemsi(){
    let books =  createdi;
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter < createdi_initialItems){
            console.log(book.verified)
            if (book.verified==true){
                out += `
                <div class= "vu p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                        <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0">${book.title}</h5>
                            <p class="lh-sm" >${book.introduction}</p>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary stretched-link">
                                    <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                </a>
                                <button type="button" class="btn btn-sm btn-outline-primary" disabled>
                                    <img src="/static/icons/liked.svg" alt="" width="16" height="16"><span class="badge rounded-pill text-bg-secondary">${book.likes}</span>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-primary" disabled>
                                    <img src="/static/icons/view.svg" alt="" width="16" height="16"><span class="badge rounded-pill text-bg-secondary">${book.views}</span>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-primary" disabled>
                                    <img src="/static/icons/verify.svg" alt="" width="16" height="16">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
            else{
                out += `
            <div class= "vu p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                    <div>
                        <h5 class="mt-0">${book.title}</h5>
                        <p class="lh-sm" >${book.introduction}</p>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary stretched-link">
                                <img src="/static/icons/view.svg" alt="" width="20" height="20">
                            </a>
                            <button type="button" class="btn btn-sm btn-outline-primary" disabled>
                                <img src="/static/icons/liked.svg" alt="" width="16" height="16"><span class="badge rounded-pill text-bg-secondary">${book.likes}</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary" disabled>
                                <img src="/static/icons/view.svg" alt="" width="16" height="16"><span class="badge rounded-pill text-bg-secondary">${book.views}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            }

        }
        
        counter++;
    }

    let div = document.createElement("div");
    createdi_container.insertBefore(div, createdi_loadMoreButton);
    div.innerHTML = out;	
}

function loadcreatediDatai(){
    let books = createdi;
    let currentDisplayedItems = document.querySelectorAll(".vu").length;
    console.log(currentDisplayedItems)
    let out = "";
    let counter = 0;
    for(let book of books){
        
        if(counter >= currentDisplayedItems && counter < createdi_loadItems + currentDisplayedItems){
            if (book.verified==true){
                out += `
                <div class= "vu p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                        <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0">${book.title}</h5>
                            <p class="lh-sm" >${book.introduction}</p>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary stretched-link">
                                    <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                </a>
                                <button type="button" class="btn btn-sm btn-outline-primary" disabled>
                                    <img src="/static/icons/liked.svg" alt="" width="16" height="16"><span class="badge rounded-pill text-bg-secondary">${book.likes}</span>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-primary" disabled>
                                    <img src="/static/icons/view.svg" alt="" width="16" height="16"><span class="badge rounded-pill text-bg-secondary">${book.views}</span>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-primary" disabled>
                                    <img src="/static/icons/verify.svg" alt="" width="16" height="16">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
            else{
                out += `
                <div class= "vu p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                        <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0">${book.title}</h5>
                            <p class="lh-sm" >${book.introduction}</p>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary stretched-link">
                                    <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                </a>
                                <button type="button" class="btn btn-sm btn-outline-primary" disabled>
                                    <img src="/static/icons/liked.svg" alt="" width="16" height="16"><span class="badge rounded-pill text-bg-secondary">${book.likes}</span>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-primary" disabled>
                                    <img src="/static/icons/view.svg" alt="" width="16" height="16"><span class="badge rounded-pill text-bg-secondary">${book.views}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
        }

        counter++;
    }

    let div = document.createElement("div");
    createdi_container.insertBefore(div, createdi_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".vu").length == createdi.length){
        createdi_loadMoreButton.style.display = "none";
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


