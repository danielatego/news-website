let verifiedauthor = document.getElementById("verifiedauthor").value;
console.log(verifiedauthor);
verifiedauthor=JSON.parse(verifiedauthor);
console.log(verifiedauthor);

let verifiedauthor_container = document.querySelector(".content5");
let verifiedauthor_loadMoreButton = document.querySelector(".content5 button");

let verifiedauthor_initialItems = 3;
let verifiedauthor_loadItems = 3;

function loadverifiedauthorInitialItems(){
    let books =  verifiedauthor;
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter < verifiedauthor_initialItems){
            out += `
                <div class= "p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                        <img class="bd-placeholder-img rounded-4 flex-shrink-0 me-3" width="144" height="96" src="/static/${book.image}" role="img" aria-label="Generic placeholder image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Generic placeholder image</title><rect width="100%" height="100%" fill="#868e96"></rect>
                        <div>
                            <h5 class="mt-0">${book.title}</h5>
                            <p>${book.introduction}</p>
                            <a class="stretched-link" href="/render/${book.id}">open</a>
                        </div>
                    </div>
                </div>
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    verifiedauthor_container.insertBefore(div, verifiedauthor_loadMoreButton);
    div.innerHTML = out;	
}

function loadverifiedauthorData(){
    let books = verifiedauthor;
    let currentDisplayedItems = document.querySelectorAll(".p-2").length;
    
    let out = "";
    let counter = 0;
    for(let book of books){
        if(counter >= currentDisplayedItems && counter < verifiedauthor_loadItems + currentDisplayedItems){
            out += `
                <div class= "p-2 mb-2 bg-secondary-subtle text-emphasis-dark rounded-4 row-gap-3">
                    <div class="d-flex position-relative ">
                    <svg class="bd-placeholder-img" width="100" height="100" xmlns="/static/person.svg" role="img" aria-label="Placeholder: Image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e5e5e5"></rect><text x="50%" y="50%" fill="#999" dy=".3em">Image</text></svg>
                        <div>
                            <h5 class="mt-0">Name: ${book.username}</h5>
                            <p>Email: ${book.email} Date: ${book.applicationdate}</p>
                            <p>${book.about}</p>
                            <a class="stretched-link" href="/render/${book.id}">open</a>
                        </div>
                    </div>
                </div>
            `;
        }
        counter++;
    }

    let div = document.createElement("div");
    verifiedauthor_container.insertBefore(div, verifiedauthor_loadMoreButton);
    div.innerHTML = out;	
    div.style.opacity = 0;

    if(document.querySelectorAll(".p-2").length == verifiedauthor.length){
        verifiedauthor_loadMoreButton.style.display = "none";
    }

    fadeIn(div);
}