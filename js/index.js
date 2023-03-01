const searchHero = document.getElementById("searchHero");
const searchResults = document.getElementById("searchResults");

var favourite_buttons = [];
const ts = "1";
const private_ = "5f227b1c33467cbb689a529cca037ecd32bf3882";
const public_ = "621b0b4e5aba8be1baeaa4e10bec37e9";

var hash = CryptoJS.MD5(`${ts + private_ + public_}`);

// for fetching the api thorugh xhr request
searchHero.addEventListener("keyup", async function () {
  var searchValue = this.value;
  if (searchValue.length <= 2) {
    searchResults.innerHTML = "";
    return;
  } else {
    searchResults.innerHTML = "";
    await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=621b0b4e5aba8be1baeaa4e10bec37e9&hash=${hash}&nameStartsWith=${searchValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const results = data.data.results;
        for (let i of results) {
          var li = document.createElement("li");
          li.classList.add("search-item");
          li.innerHTML =
            '<a href="" class="searchResults" id="' +
            i.id +
            '">' +
            i.name +
            '<img src="' +
            i.thumbnail.path +
            "." +
            i.thumbnail.extension +
            '" alt="" class="image-size"></a></><div class ="add" id="' +
            i.id +
            '" data-name="' +
            i.name +
            '" data-photo="' +
            i.thumbnail.path +
            "." +
            i.thumbnail.extension +
            '"><i id="addFav" class="fa fa-heart"></i></div>';
          searchResults.appendChild(li);
        }
        let resultHeros = document.getElementsByClassName("searchResults");
        for (let j of resultHeros) {
          j.addEventListener("click", function (event) {
            event.preventDefault();
            console.log(this.id);
            localStorage.setItem("heroSelected", this.id);
            location.replace("./heroDetails.html");
          });
        }

        // adding suerhero to the fav list
        favourite_buttons = document.getElementsByClassName("add");
        for (let i of favourite_buttons) {
          i.addEventListener("click", function () {
            if (i.innerHTML == '<i id="delFav" class="fa fa-heart"></i>') {
              i.innerHTML = '<i id="addFav" class="fa fa-heart"></i>';
              function remove(value) {
                return this.id != value.id;
              }
              // saving the data in local storage
              let oldItems =
                JSON.parse(localStorage.getItem("favHeroes")) || [];
              newItems = oldItems.filter(remove.bind(i));
              localStorage.setItem("favHeroes", JSON.stringify(newItems));
              return;
            }
            i.innerHTML = '<i id="delFav" class="fa fa-heart"></i>';
            let favItem = {
              id: this.id,
              name: this.dataset.name,
              photoUrl: this.dataset.photo,
            };
            let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
            oldItems.push(favItem);
            localStorage.setItem("favHeroes", JSON.stringify(oldItems));
          });
        }
      });
  }
});
