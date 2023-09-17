const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Endable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// VoieRSS Speech funcion
function tellMe(joke) {
  VoiceRSS.speech({
    key: "6a8d59dfa3684eb79fec81b76723ceb9",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  try {
    const response = await fetch(apiUrl);
    const apiData = await response.json();
    if (apiData.setup) {
      joke = `${apiData.setup} ... ${apiData.delivery}`;
    } else {
      joke = apiData.joke;
    }
    // Text-To-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log(error);
  }
}

// Event Lisners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
