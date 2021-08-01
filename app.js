const Url = `https://free-to-play-games-database.p.rapidapi.com/api/games`;
let container = document.querySelector(".container");

let category;

const catBtns = document.querySelectorAll(".category");
let activeButton = null;

getGames(Url);
const KEY = process.env.API_KEY;
console.log(KEY);

async function getGames(Url) {
  const resp = await fetch(Url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "afc6f0d2a3msh2d0df9a159b63e8p140fd9jsne40877285a0d",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  });

  const data = await resp.json();

  // console.log(data);

  viewGames(data);
}
// viewGames(data);

catBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // btn.classList.remove('active');

    let currBtn = e.target;
    currBtn.classList.add("active");

    if (activeButton != null && activeButton != currBtn) {
      activeButton.classList.remove("active");
    }
    activeButton = currBtn;
    category = activeButton.innerText;
    getGamesByCategory(category);
    // console.log(category);
  });
});

async function getGamesByCategory(category) {
  let catUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;

  const resp = await fetch(catUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "afc6f0d2a3msh2d0df9a159b63e8p140fd9jsne40877285a0d",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  });

  const respData = await resp.json();

  // console.log(respData);

  viewGames(respData);
}

function viewGames(data) {
  let html = "";
  data.forEach((element) => {
    // console.log(element);

    let {
      title,
      short_description,
      publisher,
      release_date,
      game_url,
      thumbnail,
    } = element;

    html += `      <div class="card">
        <img src=${thumbnail} alt="" />
        <div class="overview">
          <h2 class="game-title">${title.toUpperCase()}</h2>
          <div class="description">
            ${short_description}
          </div>
          <h3 class="publisher">${publisher}</h3>
          <h4 class="releaseDate">
            Released on : <span class="date">${release_date}</span>
          </h4>
          <a href=${game_url} target="_blank">Game Link</a>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

const search = document.getElementById("search");
let searchValue = "";

let searchGame = () => {
  searchValue = search.value.toUpperCase();

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let gameTitle = card.querySelector(".game-title").innerText;

    if (gameTitle.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};
search.addEventListener("input", searchGame);

function allGames() {
  window.location.reload();
}
