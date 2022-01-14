import API_KEY from "./api.js";

const quoteContainer = document.getElementById("quote-container");
const authorText = document.getElementById("author");
const quoteText = document.getElementById("quote");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let data = "";
// SHOW LOADING
function loading(params) {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// HIDE LOADING
function complete(params) {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function generateQuote() {
    loading();
    authorText.textContent = data.author;

    if (quoteText.textContent.length > 50) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = data.quote;
    complete();
}

async function getQuotes() {
    loading();
    try {
        // fetch from API
        const response = await fetch(
            "https://inspiring-quotes.p.rapidapi.com/random",
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "inspiring-quotes.p.rapidapi.com",
                    "x-rapidapi-key": API_KEY,
                },
            }
        );
        data = await response.json();
        generateQuote();
    } catch (error) {
        console.log(error);
    }
}

// TWEET QUOTE FUNCTION
function tweetQuote(params) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// BUTTON CLICK EVENT LISTENERS
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// ON LOAD
getQuotes();
