//home page javascript
// make a favourites key for storing all favourites hero's id in local storage if not available
if (localStorage.getItem("favourites")==null) {
    localStorage.setItem("favourites",JSON.stringify([]));
  }else{
    var arr = JSON.parse(localStorage.getItem("favourites"));
  }
  
  
  // function for show heros full details in a new page
  function showDetails(idnumber) {
    localStorage.setItem("id", idnumber);
    window.location = "about.html";
  }
  
  
  // function for adding id value in local storage favourites key if not available this id 
  function addFavourite(id) {
    if (arr.includes(id) == true) {
      alert("your hero already added in favourites")
    }else{
      
      arr.push(id);
      localStorage.setItem("favourites", JSON.stringify(arr));
      alert("your hero added in favourites")
    }
  }
  
  
  //function for show heros depends on search also filter heros depends on key press
  const showHeros = () => {
    let inputValue = document.getElementById("search").value;
    fetch(
      `https://www.superheroapi.com/api.php/586069776286026/search/${inputValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        let html = "";
        if (data.results) {
          data.results.forEach((element) => {
            html += `
              <div class="card my-2" style="width: 18rem;">
                <img class="card-img-top" onclick="showDetails(${element.id})" src="${element.image.url}">
                <div class="card-body">
                    <h5 class="card-title" onclick="showDetails(${element.id})">${element.name}</h5>
                    <span><i id="${element.id}" class="addFavourite" onclick="addFavourite(${element.id})">Add to Fav</i></span>
                </div>
              </div>
                  `;
          });
        } else {
          html += `
          <div class="page-wrap d-flex flex-row align-items-center">
          <div class="container">
              <div class="row justify-content-center">
                  <div class="col-md-12 text-center">
                      <span class="display-6 error"> Superhero not found </span>
                  </div>
              </div>
          </div>
      </div>
          `;
        }
        document.getElementById("cards-group").innerHTML = html;
      });
  };
  