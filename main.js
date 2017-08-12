let siteControls = document.querySelector(".container")
let searchButton = document.querySelector(".search_button");
let input = document.querySelector(".search");
let searchResults = document.querySelector(".results");
let musicPlayer = document.querySelector(".music_player")
let albumButton = document.querySelectorAll(".albumBtn")
var audioSource = document.querySelector(".audioSource");

siteControls.addEventListener("click", function(event) {
  let inputValue = input.value;
  console.log("event is: ", event)

  if (event.target === searchButton) {
    searchResults.innerHTML = "";
    fetch(`https://itunes.apple.com/search?term=${inputValue}`).then(
        function(response) {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }
          response.json().then(function(obj) {
            let results = obj.results;

            console.log(results.forEach(function(track) {
              console.log("results is: ", track);

              let albumCover = track.artworkUrl100
              var sample = track.previewUrl
              let artist = track.artistName
              let songTitle = track.trackName
              console.log(artist)

              let renderTracks = `
              <div class="wrapper">
                <div class="sampleSrc" src="${sample}"></div>
                 <a href="#" src="${sample}"><img class="image" value="${sample}" src="${albumCover}" alt="album_cover"> </button></a>
                <div id="title">${songTitle}</div>
                <h3>${artist}</h3>
              </div>`

              searchResults.innerHTML += renderTracks;
            }));
          });
        })
      .catch(function(err) {
        console.log("fetch error :-S", err);
      });
  }
  if (event.target && event.target.matches("img.image")) {
    console.log("Button press", event.target);
    audioSource.src = event.target.getAttribute('value');
    musicPlayer.load();
    musicPlayer.play();
  }
})
