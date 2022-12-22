// favourite hero page javascript 

// get favourites heros id from local storage and store in an array
var arr=JSON.parse(localStorage.getItem("favourites"));
console.log(arr);


// function for show heros full details in a new page
function showDetails(idnumber) {
    localStorage.setItem("id", idnumber);
    window.location = "about.html";
}


// function for remove hero from favourites, update localstorage and reload page
function removeHero(id) {
    var index=arr.indexOf(id);
    console.log(index);
    arr.splice(index,1);
    console.log(arr);
    localStorage.setItem("favourites",JSON.stringify(arr));
    alert("your hero remove successfulled");
    location.reload();
}


//function for show all favourites heros in html page 
let html="";
function getData(){
    for (let i = 0; i < arr.length; i++) {
        fetch(`https://www.superheroapi.com/api.php/586069776286026/${arr[i]}`)
            .then((response) => response.json())
            .then((data) => {
            html+=     `
                <div class="card">
                  <img class="img" onclick="showDetails(${arr[i]})" class="card-img-top" src="${data.image.url}">
                  <div class="card-body">
                      <p class="card-title"  onclick="showDetails(${arr[i]})"><b>${data.name}</b></p>
                      <span><i class="btn " onclick="removeHero(${arr[i]})">Remove</i></span>
                  </div>
                </div>`;      
            });
    };
};

//set timeout function for show all heros in fcard id
setTimeout(() => {
    document.getElementById("fcard").innerHTML=html;
}, 1000);
    