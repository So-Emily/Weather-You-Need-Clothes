// Weather Api and Input
const apiKey = "7ab439372a6b7834b1058543aced3bee"
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

// Function to handle the search submit
function handleSearchSubmit() {
    event.preventDefault();
    const city = searchInput.value
    if (!city) return
    fetchWeather(city)
    searchInput.value = ""
}

// Function to fetch the weather data
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

// Function to display the weather data
function displayWeather(data) {
    document.querySelector("#city-name").textContent = data.name
    document.querySelector("#temp").textContent = data.main.temp

// If statements for the different temperatures per city    
    if (data.main.temp >= 90) {
        // Loops for specific clothes depending on the temperature - Hot
        
        console.log("Too Hot to wear clothes")
    } else if (data.main.temp <= 90 && data.main.temp >= 75) {
        // Loops for specific clothes depending on the temperature  - Warm

        console.log("Perfect weather to wear tank top")
    } else if (data.main.temp <= 75 && data.main.temp >= 50) {
        // Loops for specific clothes depending on the temperature  - Cool

        console.log("Perfect weather to wear a sweater")
    } else if (data.main.temp <= 50 && data.main.temp >= 32) {
        // Loops for specific clothes depending on the temperature - Cold

        console.log("Perfect weather to wear a jacket")
    } else {
        // Loops for specific clothes depending on the temperature - Very Cold

        console.log("Too cold to wear clothes")
    }
    
}

// Event listener for the search button
searchBtn.addEventListener("click", handleSearchSubmit)

// Start of Clothes API
// --------------------------------------------------------------------------->
// Getting the clothes API
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '6a23a64c91mshed64ee6d1f4bfaep1f7c39jsn1eeb76e2d677',
        'x-rapidapi-host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
};

// Function to fetch the clothes data from the API
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

// Function to display the clothes data
function displayClothes(data) {
    console.log(data);

    // Loop through the data array - displaying mens jackets in response
    for (let i = 0; i < data.response.docs.length; i++) {
        // Log the dtata arrays
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

// End of Clothes API