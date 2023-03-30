let new_messages = document.getElementById("newmessage").value;
new_messages=JSON.parse(new_messages);

let new_messages_container = document.querySelector(".content");
let new_messages_loadMoreButton = document.querySelector(".content button");

let new_messages_initialItems = 3;
let new_messages_loadItems = 3;

function loadnew_messagesInitialItems(){
    let books =  new_messages;
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter < new_messages_initialItems){
            out += `
            <div class= "nmesa p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                    <div>
                        <h5 class="mt-0">${book.title}</h5>
                        <p class="lh-sm" >${book.introduction}</p>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/view.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/edit/${book.id}" type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/edit.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/verify/${book.id}" type="button" class="btn btn-outline-success">
                                <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                            </a>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop-${book.id}">
                                <img src="/static/icons/delete1.svg" alt="" width="20" height="20">
                            </button>
                            <div class="modal fade" id="staticBackdrop-${book.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure you want to delete this article permanently?
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <a href = "/admin/delete/${book.id}" type="button" class="btn btn-danger">
                                        Delete
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    new_messages_container.insertBefore(div, new_messages_loadMoreButton);
    div.innerHTML = out;	
}

function loadnew_messagesData(){
    let books = new_messages;
    let currentDisplayedItems = document.querySelectorAll(".nmesa").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter >= currentDisplayedItems && counter < new_messages_loadItems + currentDisplayedItems){
            out += `
            <div class= "nmesa p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                    <div>
                        <h5 class="mt-0">${book.title}</h5>
                        <p class="lh-sm" >${book.introduction}</p>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/view.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/edit/${book.id}" type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/edit.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/verify/${book.id}" type="button" class="btn btn-outline-success">
                                <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                            </a>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop-${book.id}">
                                <img src="/static/icons/delete1.svg" alt="" width="20" height="20">
                            </button>
                            <div class="modal fade" id="staticBackdrop-${book.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure you want to delete this article permanently?
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <a href = "/admin/delete/${book.id}" type="button" class="btn btn-danger">
                                        Delete
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    new_messages_container.insertBefore(div, new_messages_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".nmesa").length == new_messages.length){
        new_messages_loadMoreButton.style.display = "none";
    }

    fadeIn(div);
}
let unverified = document.getElementById("unverified").value;
unverified=JSON.parse(unverified);

let unverified_container = document.querySelector(".content1");
let unverified_loadMoreButton = document.querySelector(".content1 button");

let unverified_initialItems = 3;
let unverified_loadItems = 3;

function loadUnverifiedInitialItems(){
    let books =  unverified;
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter < unverified_initialItems){
            var a=book.id
            out += `
            <div class= "unveri p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                    <div>
                        <h5 class="mt-0">${book.title}</h5>
                        <p class="lh-sm" >${book.introduction}</p>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/view.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/edit/${book.id}" type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/edit.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/verify/${book.id}" type="button" class="btn btn-outline-success">
                                <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                            </a>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop-${book.id}">
                                <img src="/static/icons/delete1.svg" alt="" width="20" height="20">
                            </button>
                            <div class="modal fade" id="staticBackdrop-${book.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure you want to delete this article permanently?
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <a href = "/admin/delete/${book.id}" type="button" class="btn btn-danger">
                                        Delete
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    unverified_container.insertBefore(div, unverified_loadMoreButton);
    div.innerHTML = out;	
}

function loadUnverifiedData(){
    let books = unverified;
    let currentDisplayedItems = document.querySelectorAll(".unveri").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter >= currentDisplayedItems && counter < unverified_loadItems + currentDisplayedItems){
            var a= book.id
            out += `
            
            <div class= "unveri p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                        <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0">${book.title}</h5>
                            <p class="lh-sm">${book.introduction}</p>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary">
                                    <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/edit/${book.id}" type="button" class="btn btn-outline-primary">
                                    <img src="/static/icons/edit.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/verify/${book.id}" type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                                </a>
                                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop-${book.id}">
                                    <img src="/static/icons/delete1.svg" alt="" width="20" height="20">
                                </button>
                                <div class="modal fade" id="staticBackdrop-${book.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                        Are you sure you want to delete ${book.id}
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <a href = "/admin/delete/${book.id}" type="button" class="btn btn-outline-danger">
                                            Delete
                                        </a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    unverified_container.insertBefore(div, unverified_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".unveri").length == unverified.length){
        unverified_loadMoreButton.style.display = "none";
    }

    fadeIn(div);
}
let Verified = document.getElementById("Verified").value;
Verified=JSON.parse(Verified);

let Verified_container = document.querySelector(".content2");
let Verified_loadMoreButton = document.querySelector(".content2 button");

let Verified_initialItems = 3;
let Verified_loadItems = 3;

function loadVerifiedInitialItems(){
    let books =  Verified;
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter < Verified_initialItems){
            out += `
            <div class= "veri p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                    <div>
                        <h5 class="mt-0">${book.title}</h5>
                        <p class="lh-sm">${book.introduction}</p>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/view.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/edit/${book.id}" type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/edit.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/Unverify/${book.id}" type="button" class="btn btn-outline-danger">
                                <img src="/static/icons/unverify.svg" alt="" width="20" height="20">
                            </a>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop-${book.id}">
                                <img src="/static/icons/delete1.svg" alt="" width="20" height="20">
                            </button>
                            <div class="modal fade" id="staticBackdrop-${book.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure you want to delete this article permanently?
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <a href = "/admin/delete/${book.id}" type="button" class="btn btn-danger">
                                        Delete
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    Verified_container.insertBefore(div, Verified_loadMoreButton);
    div.innerHTML = out;	
}

function loadVerifiedData(){
    let books = Verified;
    let currentDisplayedItems = document.querySelectorAll(".veri").length;
    console.log(currentDisplayedItems)
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter >= currentDisplayedItems && counter < Verified_loadItems + currentDisplayedItems){
            out += `
            <div class= " veri p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                    <div>
                        <h5 class="mt-0">${book.title}</h5>
                        <p class="lh-sm" >${book.introduction}</p>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href = "/render/${book.id}" type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/view.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/edit/${book.id}" type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/edit.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/Unverify/${book.id}" type="button" class="btn btn-outline-danger">
                                <img src="/static/icons/unverify.svg" alt="" width="20" height="20">
                            </a>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop-${book.id}">
                                <img src="/static/icons/delete1.svg" alt="" width="20" height="20">
                            </button>
                            <div class="modal fade" id="staticBackdrop-${book.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure you want to delete this article permanently?
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <a href = "/admin/delete/${book.id}" type="button" class="btn btn-danger">
                                        Delete
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    Verified_container.insertBefore(div, Verified_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".veri").length == Verified.length){
        Verified_loadMoreButton.style.display = "none";
    }

    fadeIn(div);
}
let newauthor = document.getElementById("newauthor").value;
newauthor=JSON.parse(newauthor);

let newauthor_container = document.querySelector(".content3");
let newauthor_loadMoreButton = document.querySelector(".content3 button");

let newauthor_initialItems = 3;
let newauthor_loadItems = 3;

function loadnewauthorInitialItems(){
    let books =  newauthor;
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter < newauthor_initialItems){
            out += `
                <div class= "nau p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/person.svg" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0 text-capitalize">Name: ${book.first_name} ${book.second_name} </h5>
                            <p class="mb-1">Email: ${book.email} </p>
                            <p class="mb-1">Date: ${book.applicationdate}</p>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a href = "/admin/viewAuthor/${book.id}"type="button" class="btn btn-outline-primary">
                                    <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/verifyAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/blockAuthor/${book.id}"type="button" class="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Tooltip on left">
                                    <img src="/static/icons/block.svg" alt="" width="20" height="20">
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
    newauthor_container.insertBefore(div, newauthor_loadMoreButton);
    div.innerHTML = out;	
}

function loadnewauthorData(){
    let books = newauthor;
    let currentDisplayedItems = document.querySelectorAll(".nau").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
            if(counter >= currentDisplayedItems && counter < newauthor_loadItems + currentDisplayedItems){
                out += `
                <div class= " nau p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/person.svg" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0 text-capitalize">Name: ${book.first_name} ${book.second_name} </h5>
                            <p class="mb-1">Email: ${book.email} </p>
                            <p class="mb-1">Date: ${book.applicationdate}</p>
                            <div class="btn-group" mx-auto role="group" aria-label="Basic example">
                                <a href = "/admin/viewAuthor/${book.id}"type="button" class="btn btn-outline-primary">
                                    <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/verifyAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/BlockAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/unblock.svg" alt="" width="20" height="20">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            }
        
        counter++;
    }

    let div = document.createElement("nau");
    newauthor_container.insertBefore(div, newauthor_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".nau").length == newauthor.length){
        newauthor_loadMoreButton.style.display = "none";
    }

    fadeIn(div);
}
let unverifiedauthor = document.getElementById("unverifiedauthor").value;
unverifiedauthor=JSON.parse(unverifiedauthor);

let unverifiedauthor_container = document.querySelector(".content4");
let unverifiedauthor_loadMoreButton = document.querySelector(".content4 button");

let unverifiedauthor_initialItems = 3;
let unverifiedauthor_loadItems = 3;

function loadunverifiedauthorInitialItems(){
    let books =  unverifiedauthor;
    let out = "";
    let counter = 0;
    for(let book of books){
        if(book.block==false){
        if(counter < unverifiedauthor_initialItems){
            out += `
                <div class= "unva p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/person.svg" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0  text-capitalize">Name: ${book.first_name} ${book.second_name} </h5>
                            <p class="mb-1">Email: ${book.email} </p>
                            <p class="mb-1">Date: ${book.applicationdate}</p>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a href = "/admin/viewAuthor/${book.id}"type="button" class="btn btn-outline-primary">
                                    <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/verifyAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/blockAuthor/${book.id}"type="button" class="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Tooltip on left">
                                    <img src="/static/icons/block.svg" alt="" width="20" height="20">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }}
        else{

        if(counter < unverifiedauthor_initialItems){
            out += `
                <div class= " unva p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/person.svg" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0 text-capitalize">Name: ${book.first_name} ${book.second_name} </h5>
                            <p class="mb-1">Email: ${book.email} </p>
                            <p class="mb-1">Date: ${book.applicationdate}</p>
                            <div class="btn-group" mx-auto role="group" aria-label="Basic example">
                                <a href = "/admin/viewAuthor/${book.id}"type="button" class="btn btn-outline-primary">
                                    <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/verifyAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/unBlockAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/unblock.svg" alt="" width="20" height="20">
                                </a>
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
    unverifiedauthor_container.insertBefore(div, unverifiedauthor_loadMoreButton);
    div.innerHTML = out;	
}

function loadunverifiedauthorData(){
    let books = unverifiedauthor;
    let currentDisplayedItems = document.querySelectorAll(".unva").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
        if(book.block==false){
        if(counter >= currentDisplayedItems && counter < unverifiedauthor_loadItems + currentDisplayedItems){
            out += `
            <div class= " unva p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                <div class="d-flex position-relative ">
                <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/person.svg" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                    <div>
                        <h5 class="mt-0 text-capitalize">Name: ${book.first_name} ${book.second_name} </h5>
                        <p class="mb-1">Email: ${book.email} </p>
                        <p class="mb-1">Date: ${book.applicationdate}</p>
                        <div class="btn-group" mx-auto role="group" aria-label="Basic example">
                            <a href = "/admin/viewAuthor/${book.id}"type="button" class="btn btn-outline-primary">
                                <img src="/static/icons/view.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/verifyAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                            </a>
                            <a href = "/admin/BlockAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                <img src="/static/icons/unblock.svg" alt="" width="20" height="20">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        }}
        else{
            if(counter >= currentDisplayedItems && counter < unverifiedauthor_loadItems + currentDisplayedItems){
                out += `
                <div class= "unva p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/person.svg" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0 text-capitalize">Name: ${book.first_name} ${book.second_name} </h5>
                            <p class="mb-1">Email: ${book.email} </p>
                            <p class="mb-1">Date: ${book.applicationdate}</p>
                            <div class="btn-group" mx-auto role="group" aria-label="Basic example">
                                <a href = "/admin/viewAuthor/${book.id}"type="button" class="btn btn-outline-primary">
                                    <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/verifyAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/unBlockAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/unblock.svg" alt="" width="20" height="20">
                                </a>
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
    unverifiedauthor_container.insertBefore(div, unverifiedauthor_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".unva").length == unverifiedauthor.length){
        unverifiedauthor_loadMoreButton.style.display = "none";
    }

    fadeIn(div);
}
let verifiedauthor = document.getElementById("verifiedauthor").value;
verifiedauthor=JSON.parse(verifiedauthor);

let verifiedauthor_container = document.querySelector(".content5");
let verifiedauthor_loadMoreButton = document.querySelector(".content5 button");

let verifiedauthor_initialItems = 3;
let verifiedauthor_loadItems = 3;

function loadverifiedauthorInitialItems(){
    let books =  verifiedauthor;
    let out = "";
    let counter = 0;
    for(let book of books){
        if(book.block==false){
            if(counter < verifiedauthor_initialItems){
                out += `
                    <div class= "vea p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                        <div class="d-flex position-relative ">
                        <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/person.svg" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                            <div>
                                <h5 class="mt-0 text-capitalize">Name: ${book.first_name} ${book.second_name} </h5>
                                <p class="mb-1">Email: ${book.email} </p>
                                <p class="mb-1">Date: ${book.applicationdate}</p>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <a href = "/admin/viewAuthor/${book.id}"type="button" class="btn btn-outline-primary">
                                        <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                    </a>
                                    <a href = "/admin/blockAuthor/${book.id}"type="button" class="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Tooltip on left">
                                        <img src="/static/icons/block.svg" alt="" width="20" height="20">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }}
            else{
    
            if(counter < verifiedauthor_initialItems){
                out += `
                    <div class= "vea p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                        <div class="d-flex position-relative ">
                        <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/person.svg" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                            <div>
                                <h5 class="mt-0 text-capitalize">Name: ${book.first_name} ${book.second_name} </h5>
                                <p class="mb-1">Email: ${book.email} </p>
                                <p class="mb-1">Date: ${book.applicationdate}</p>
                                <div class="btn-group" mx-auto role="group" aria-label="Basic example">
                                    <a href = "/admin/viewAuthor/${book.id}"type="button" class="btn btn-outline-primary">
                                        <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                    </a>
                                    <a href = "/admin/unBlockAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                        <img src="/static/icons/unblock.svg" alt="" width="20" height="20">
                                    </a>
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
    verifiedauthor_container.insertBefore(div, verifiedauthor_loadMoreButton);
    div.innerHTML = out;	
}

function loadverifiedauthorData(){
    let books = verifiedauthor;
    let currentDisplayedItems = document.querySelectorAll(".vea").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
        if(book.block==false){
            if(counter >= currentDisplayedItems && counter < verifiedauthor_loadItems + currentDisplayedItems){
                out += `
                <div class= "vea p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                    <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/person.svg" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0 text-capitalize">Name: ${book.first_name} ${book.second_name} </h5>
                            <p class="mb-1">Email: ${book.email} </p>
                            <p class="mb-1">Date: ${book.applicationdate}</p>
                            <div class="btn-group" mx-auto role="group" aria-label="Basic example">
                                <a href = "/admin/viewAuthor/${book.id}"type="button" class="btn btn-outline-primary">
                                    <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/verifyAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                                </a>
                                <a href = "/admin/BlockAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                    <img src="/static/icons/unblock.svg" alt="" width="20" height="20">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            }}
            else{
                if(counter >= currentDisplayedItems && counter < verifiedauthor_loadItems + currentDisplayedItems){
                    out += `
                    <div class= "vea p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                        <div class="d-flex position-relative ">
                        <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/person.svg" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                            <div>
                                <h5 class="mt-0 text-capitalize">Name: ${book.first_name} ${book.second_name} </h5>
                                <p class="mb-1">Email: ${book.email} </p>
                                <p class="mb-1">Date: ${book.applicationdate}</p>
                                <div class="btn-group" mx-auto role="group" aria-label="Basic example">
                                    <a href = "/admin/viewAuthor/${book.id}"type="button" class="btn btn-outline-primary">
                                        <img src="/static/icons/view.svg" alt="" width="20" height="20">
                                    </a>
                                    <a href = "/admin/verifyAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                        <img src="/static/icons/verify.svg" alt="" width="20" height="20">
                                    </a>
                                    <a href = "/admin/unBlockAuthor/${book.id}"type="button" class="btn btn-outline-success">
                                        <img src="/static/icons/unblock.svg" alt="" width="20" height="20">
                                    </a>
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
    verifiedauthor_container.insertBefore(div, verifiedauthor_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".vea").length == verifiedauthor.length){
        verifiedauthor_loadMoreButton.style.display = "none";
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


