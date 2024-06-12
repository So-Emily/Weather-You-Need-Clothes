const apiKey = "7ab439372a6b7834b1058543aced3bee"
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

function handleSearchSubmit() {
    event.preventDefault();
    const city = searchInput.value
    if (!city) return
    fetchWeather(city)
    searchInput.value = ""
}

function fetchWeather(city) {
    const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
    fetch(apiUrlWeather)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayWeather(data)
            localStorage.setItem("weatherData", JSON.stringify(data));
            // window.location.href = "drip.html"
    })
}

function displayWeather(data) {
    document.querySelector("#city-name").textContent = data.name
    document.querySelector("#temp").textContent = data.main.temp

    if (data.main.temp >= 90) {
        console.log("Too Hot to wear clothes")
    } else if (data.main.temp <= 90 && data.main.temp >= 75) {
        console.log("Perfect weather to wear tank top")
    } else if (data.main.temp <= 75 && data.main.temp >= 50) {
        console.log("Perfect weather to wear a sweater")
    } else if (data.main.temp <= 50 && data.main.temp >= 32) {
        console.log("Perfect weather to wear a jacket")
    } else {
        console.log("Too cold to wear clothes")
    }
    
}

searchBtn.addEventListener("click", handleSearchSubmit)

// Start of Clothes API
// --------------------------------------------------------------------------->
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '6a23a64c91mshed64ee6d1f4bfaep1f7c39jsn1eeb76e2d677',
        'x-rapidapi-host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
};

function fetchClothes(clothes, gender) {
    const apiUrlClothes = `https://apidojo-forever21-v1.p.rapidapi.com/products/search?query=${clothes}&rows=20&start=0&gender=${gender}`;

    fetch(apiUrlClothes, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayClothes(data);
        })
        .catch(error => {
            console.log('There was a problem with the fetch operation: ' + error.message);
        });
}

fetchClothes("jacket", "Mens");

function displayClothes(data) {
    console.log(data);
    for (let i = 0; i < data.response.docs.length; i++) {
        console.log(data.response.docs[i]);
        // Loop through titles
        const clothesElement = document.createElement("p");
        clothesElement.textContent = data.response.docs[i].title;
        document.querySelector("#clothes").appendChild(clothesElement);
        // Loop through images
        const clothesImage = document.createElement("img");
        clothesImage.src = data.response.docs[i].thumb_image;
        document.querySelector("#clothes").appendChild(clothesImage);
        
    }
    // document.querySelector("#clothes").textContent = data.name
    // A loop over data.response.docs
}
