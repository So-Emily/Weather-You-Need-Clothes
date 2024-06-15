const apiKey = "7ab439372a6b7834b1058543aced3bee"
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")
const cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || []

// Event listener for the clear history button
document.querySelector("#clear-history").addEventListener("click", function() {
    cityHistory.length = 0;  // Clear the array
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));  // Update the local storage
    renderCityHistory();  // Update the UI
});

// Event listener for the clear button
document.querySelector("#clear-btn").addEventListener("click", function() {
    location.reload();
});

// Function to save the city
function saveCity(city) {
    if (cityHistory.includes(city)) return
    cityHistory.push(city)
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory))
    renderCityHistory()
}

// Function to render the city history
function renderCityHistory() {
    const cityHistoryElement = document.querySelector("#city-history")
    cityHistoryElement.innerHTML = ""

    // Loop over the cityHistory array
    for (let i = 0; i < cityHistory.length; i++) {
        const cityElement = document.createElement("button")
        cityElement.textContent = cityHistory[i]
        cityElement.className = "history-buttons";
        cityElement.addEventListener("click", function() {
            fetchWeather(cityHistory[i])
        })
        cityHistoryElement.appendChild(cityElement)
    }}
// Call the renderCityHistory function
renderCityHistory()

// Get the history section
let historySection = document.getElementById('history-section');
// Check if the cityHistory array is empty
if (cityHistory.length > 0) {
    historySection.style.display = 'block'; // Show the history section
} else {
    historySection.style.display = 'none'; // Hide the history section
}

// Function to handle the search submit
function handleSearchSubmit() {
    event.preventDefault();
    const city = searchInput.value
    if (!city) return
    fetchWeather(city)
    searchInput.value = ""
}

// Event listener for the search form
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    location.reload();
    handleSearchSubmit();
});

// Function to fetch the weather data
function fetchWeather(city) {
    const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
    fetch(apiUrlWeather)
        .then(res =>{ 
            if (!res.ok) {
                throw new Error("City not found")
            }
            else {
                saveCity(city)
                return res.json()
            }
        })
        .then(data => {
            console.log(data)
            displayWeather(data)
            localStorage.setItem("weatherData", JSON.stringify(data));

            // Get the temperature from the data
            const temperature = data.main.temp;

            const weatherType = data.weather[0].main;
            console.log(weatherType)

            // Get the video element
            const video = document.getElementById('myVideo');

            // Change the video source based on the temperature
            if (weatherType == 'Clouds') {
                video.src = 'assets/images/clouds.mp4';
            } else if (weatherType == 'Rain') {
                video.src = 'assets/images/rainclouds.mp4';
            } else {
                video.src = 'assets/images/happy-sun.mp4';
            }

            // Load and play the new video
            video.load();
            video.play();
        })
        .catch(error => {
            console.log('There was a problem with the fetch operation: ' + error.message);
        });
}

// Function to display the weather data
function displayWeather(data) {
    const temp = data.main.temp
    document.querySelector("#city-name").textContent = data.name
    document.querySelector("#temp").textContent = temp + "°F"
    
    // Get clothes title element to display when clothes are shown
    var div = document.getElementsByClassName('cl-title-hide')[0];

    // // If statements for the different temperatures per city 
    if (temp >= 90) {
        // Loops for specific clothes depending on the temperature - Hot
        div.style.display = 'block';
        fetchClothes(["tops", "shorts", "dresses", "skirts", "swimwear", "rompers", "sandals", "sunscreen"])

        // Display weather console text
        document.querySelector("#weather-text").textContent = "Too Hot to wear clothes";
        console.log("Too Hot to wear clothes")

    } else if (temp <= 90 && temp >= 75) {
        // Loops for specific clothes depending on the temperature  - Warm
        div.style.display = 'block';
        fetchClothes(["tops", "Sunglasses", "sandals", "shorts", "dresses", "skirts", "swimwear", "rompers", "sunscreen"])

        // Display weather console text
        document.querySelector("#weather-text").textContent = "Perfect weather to wear a tank top, shorts, and sandals";
        console.log("Perfect weather to wear a tank top, shorts, and sandals")

    } else if (temp <= 75 && temp>= 50) {
        // Loops for specific clothes depending on the temperature  - Cool
        div.style.display = 'block';
        fetchClothes(["Long Sleeve","shorts", "sweater", "boots", "scarf", "beanie", "coat", "Blazer"])
      
        // Display weather console text
        document.querySelector("#weather-text").textContent = "Perfect weather to wear a t-shirt and shorts";
        console.log("Perfect weather to wear a long sleeve shirt and shorts")

    } else if (temp <= 50 && temp>= 32) {
        // Loops for specific clothes depending on the temperature - Cold
        div.style.display = 'block';
        fetchClothes (["jacket", "Sweater", "boots", "scarf", "gloves", "beanie", "coat", "Long-Sleeve", "Joggers"])

        // Display weather console text
        document.querySelector("#weather-text").textContent = "Perfect weather to wear jackets, jeans and sweaters";
        console.log("Perfect weather to wear jackets, jeans and sweaters")
        

    } else {
        // Loops for specific clothes depending on the temperature - Very Cold
        
        fetchClothes(["jacket", "sweater", "boots", "scarf", "gloves", "beanie", "coat", "long sleeve", "snow"])

        // Display weather console text
        document.querySelector("#weather-text").textContent = "Too cold to not wear clothes";
        console.log("Too cold to not wear clothes")
        div.style.display = 'block';
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
        //Em's API key
        'x-rapidapi-key': 'a863cfc92dmsh5dbeb6496c2f7c8p1ab1a6jsn8462959244b0',

        //Alfonso's API key - ran out of runs xD
        // 'x-rapidapi-key': '6a23a64c91mshed64ee6d1f4bfaep1f7c39jsn1eeb76e2d677',

        'x-rapidapi-host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
};

// Function to fetch the clothes data from the API
function fetchClothes(clothes, gender) {


    for (let i = 0; i < clothes.length; i++) {
        const apiUrlClothes = `https://apidojo-forever21-v1.p.rapidapi.com/products/search?query=${clothes[i]}&rows=20&start=0`;
    

        fetch(apiUrlClothes, options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.response.docs.length; i++) {
                    console.log(data.response.docs[i]);
                }
                displayClothes(data);
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation: ' + error.message);
            });
        }
}

// Function to display the clothes
function displayClothes(data) {
    console.log(data);

    // Loop over the data.response.docs
    for (let i = 0; i < data.response.docs.length; i++) {
        console.log(data.response.docs[i]);
        
        // Create a card element
        const card = document.createElement("div");
        const clothesElement = document.createElement("p");
       
        clothesElement.textContent = data.response.docs[i].title;
        // document.querySelector("#clothes").appendChild(clothesElement);
        // Create an image element
        const clothesImage = document.createElement("img");

        clothesImage.src = data.response.docs[i].thumb_image;
        clothesImage.style.width = "100%";

        // Create a price element
        const clothesPrice = document.createElement("p");
        clothesPrice.textContent = "$" + data.response.docs[i].price;

        // Create a url element to buy the clothes
        const urlElement = document.createElement("a");
        urlElement.href = data.response.docs[i].url;
        urlElement.textContent = "Buy Now";
        urlElement.target = "_blank"; // Opens the link in a new tab

        // Append the elements to the card
        card.append(clothesElement, clothesImage, clothesPrice, urlElement);
        document.querySelector("#clothes-cards").appendChild(card);
    }
}

// End of Clothes API
// --------------------------------------------------------------------------->