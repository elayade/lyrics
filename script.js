const songsEl = document.querySelector(".songs-show");
const lyricsEl = document.querySelector(".lyrics-show");
const submit = document.getElementById("submit");
const input = document.getElementById("search");
const main = [
  {
    artist: "Drake",
    title: "One Dance",
    image:
      "https://www.soul-addict.com/upload/drake%20Views%20From%20The%206%20cover.jpg",
  },
  {
    artist: "Rihanna",
    title: "Diamonds",
    image:
      "https://i.pinimg.com/originals/4b/d3/36/4bd336da122345f86f239c5d7f6593c2.jpg",
  },
  {
    artist: "Coldplay",
    title: "Yellow",
    image: "https://m.media-amazon.com/images/I/91BIt8cpbrL._SS500_.jpg",
  },
  {
    artist: "Kendrick Lamar",
    title: "Humble",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71tAOC%2Bdf8L._SL1400_.jpg",
  },
  {
    artist: "Ed Sheeran",
    title: "Shape Of You",
    image:
      "https://img.discogs.com/Wdgn5nHuaUx4qKmDmhqJWvSQU_g=/fit-in/600x527/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9882982-1569769665-6597.jpeg.jpg",
  },
  {
    artist: "Halsey",
    title: "Without Me",
    image:
      "https://static.fnac-static.com/multimedia/Images/FR/NR/28/e8/ad/11397160/1540-1/tsp20190913093122/Manic.jpg",
  },
  {
    artist: "Dua Lipa",
    title: "Physical",
    image:
      "https://soundofbrit.fr/wp-content/uploads/2020/03/Dua-Lipa-Future-Nostalgia.jpg",
  },
  {
    artist: "J cole",
    title: "Middle Child",
    image:
      "https://static.hotmixradio.fr/wp-content/uploads/j-cole-middle-child.jpg",
  },
  {
    artist: "Drake",
    title: "In My Feelings",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/614g7cP8%2BAL._SL1110_.jpg",
  },
  {
    artist: "Justin Beiber",
    title: "Love yourSelf",
    image: "https://m.media-amazon.com/images/I/71p4jC0G9pL._SS500_.jpg",
  },
  {
    artist: "imagine dragons",
    title: "Natural",
    image: "https://upload.wikimedia.org/wikipedia/en/9/95/Origins_cover.png",
  },
  {
    artist: "the chainsmokers",
    title: "closer",
    image: "https://m.media-amazon.com/images/I/81uLbZTl4NL._SS500_.jpg",
  },
  {
    artist: "sia",
    title: "alive",
    image:
      "https://kenziplus.com/wp-content/uploads/2016/02/Sia-This-Is-Acting-Deluxe-Edition-Album-01.jpg",
  },
  {
    artist: "billie eilish",
    title: "bad guy",
    image:
      "https://cdn-resources.crowdcat.co/media/202ab10e-8fda-4a28-9b36-54962e433320.jpeg",
  },
  {
    artist: "khalid",
    title: "talk",
    image: "https://covers3.hosting-media.net/jpg343/u0886447501610.jpg",
  },
];
const apiURL = "https://api.lyrics.ovh";

async function getSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  displaySongs(data.data);
}
function displaySongs(data) {
  data.map((song) => {
    const title = song.title;
    const image = song.album.cover_xl;
    const artist = song.artist.name;
    const box = document.createElement("div");
    box.className = "box";
    box.setAttribute("data-artist", `${artist}`);
    box.setAttribute("data-title", `${title}`);
    box.innerHTML = `

      <img
        src="${image}"
        alt="${artist}"
      />
      <p><strong>${artist}</strong>-<span>${title}</

    `;
    songsEl.appendChild(box);
  });
}
function showCase() {
  main.forEach((song) => {
    const { artist, title, image } = song;
    const box = document.createElement("div");
    box.className = "box";
    box.setAttribute("data-artist", `${artist}`);
    box.setAttribute("data-title", `${title}`);
    box.innerHTML = `

      <img
        src="${image}"
        alt="${artist}"
      />
      <p><strong>${artist}</strong>-<span>${title}</

    `;
    songsEl.appendChild(box);
  });
}
showCase();
async function getLyrics(e) {
  const artist = e.target.dataset.artist;
  const title = e.target.dataset.title;
  const res = await fetch(`${apiURL}/v1/${artist}/${title}`);
  const data = await res.json();
  displayLyrics(data, artist, title);
}
function displayLyrics(data, artist, title) {
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  songsEl.innerHTML = "";
  if (lyrics === undefined) {
    lyricsEl.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle} Not available for Now 😔 Try Later</h2>`;
  } else {
    lyricsEl.innerHTML = `<h2><strong>${artist}</strong> - ${title}</h2>
    <span>${lyrics}</span>`;
  }
}

songsEl.addEventListener("click", (e) => {
  if (e.target.className === "box") {
    getLyrics(e);
  }
});

submit.addEventListener("click", () => {
  const term = input.value;
  if (term.trim() !== "") {
    songsEl.innerHTML = "";
    getSongs(term);
    input.value = "";
    lyricsEl.innerHTML = "";
  }
});
input.addEventListener("keypress", (e) => {
  const term = e.target.value;
  if (e.keyCode == 13 && term.trim() !== "") {
    songsEl.innerHTML = "";
    getSongs(term);
    e.target.value = "";
    lyricsEl.innerHTML = "";
  }
});
