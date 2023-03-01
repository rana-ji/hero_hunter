const name_ = document.getElementById("name");
const photo = document.getElementById("photo");
const comics = document.getElementById("comics");
const series = document.getElementById("series");
const stories = document.getElementById("stories");

const ts = "1";
const private_ = "5f227b1c33467cbb689a529cca037ecd32bf3882";
const public_ = "621b0b4e5aba8be1baeaa4e10bec37e9";

var hash = CryptoJS.MD5(`${ts + private_ + public_}`);

fetch(
  `https://gateway.marvel.com:443/v1/public/characters/${localStorage.getItem(
    "heroSelected"
  )}?ts=1&apikey=621b0b4e5aba8be1baeaa4e10bec37e9&hash=${hash}`
)
  .then((res) => res.json())
  .then((data) => {
    const data_ = data.data.results[0];
    name_.innerHTML = data_.name;
    photo.setAttribute(
      "src",
      data_.thumbnail.path + "." + data_.thumbnail.extension
    );
    const stories_ = data_.stories.items;
    for (let i of stories_) {
      var li = document.createElement("li");
      li.innerHTML = "<p>" + i.name + "</p>";
      stories.appendChild(li);
    }
    const series_ = data_.series.items;
    for (let i of series_) {
      var li = document.createElement("li");
      li.innerHTML = "<p>" + i.name + "</p>";
      series.appendChild(li);
    }
    const comic_ = data_.comics.items;
    for (let i of comic_) {
      var li = document.createElement("li");
      li.innerHTML = "<p>" + i.name + "</p>";
      comics.appendChild(li);
    }
  });
