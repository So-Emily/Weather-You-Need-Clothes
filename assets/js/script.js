// Weather Api and Input
const apiKey = "7ab439372a6b7834b1058543aced3bee"
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")
const cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || []

function saveCity(city) {
    if (cityHistory.includes(city)) return
    cityHistory.push(city)
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory))
    renderCityHistory()
}
function renderCityHistory() {
    const cityHistoryElement = document.querySelector("#city-history")
    cityHistoryElement.innerHTML = ""
    for (let i = 0; i < cityHistory.length; i++) {
        const cityElement = document.createElement("button")
        cityElement.textContent = cityHistory[i]
        cityElement.addEventListener("click", function() {
            fetchWeather(cityHistory[i])
        })
        cityHistoryElement.appendChild(cityElement)
    }
    }
renderCityHistory()

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
            // window.location.href = "drip.html"
    })
    .catch(error => {
        console.log('There was a problem with the fetch operation: ' + error.message);
        // alert("City not found")   potentially change into a modal
    });
}

// Function to display the weather data
function displayWeather(data) {
    const temp = data.main.temp
    document.querySelector("#city-name").textContent = data.name
    document.querySelector("#temp").textContent = temp 
  
    // If statements for the different temperatures per city 
    if (temp >= 90) {
        // Loops for specific clothes depending on the temperature - Hot

        console.log("Too Hot to wear clothes")
    } else if (temp <= 90 && temp >= 75) {
        // Loops for specific clothes depending on the temperature  - Warm

        console.log("Perfect weather to wear tank top")
    } else if (temp <= 75 && temp>= 50) {
        // Loops for specific clothes depending on the temperature  - Cool
        fetchClothes("top,shorts")
      
        console.log("Perfect weather to wear a sweater")
    } else if (temp <= 50 && temp>= 32) {
        // Loops for specific clothes depending on the temperature - Cold
        fetchClothes ("jacket")

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
    const apiUrlClothes = `https://apidojo-forever21-v1.p.rapidapi.com/products/search?query=${clothes}&rows=20&start=0`;

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

// Function to display the clothes
function displayClothes(data) {
    console.log(data);
    document.querySelector("#clothes-cards").innerHTML = "";
    for (let i = 0; i < data.response.docs.length; i++) {
        console.log(data.response.docs[i]);
        const card = document.createElement("div");
        const clothesElement = document.createElement("p");
       
        clothesElement.textContent = data.response.docs[i].title;
        // document.querySelector("#clothes").appendChild(clothesElement);
        const clothesImage = document.createElement("img");
       
        clothesImage.src = data.response.docs[i].thumb_image;
        

        const clothesPrice = document.createElement("p");
        clothesPrice.textContent = "$" + data.response.docs[i].price;

        const urlElement = document.createElement("a");
        urlElement.href = data.response.docs[i].url;
        urlElement.textContent = "Buy Now";

        card.append(clothesElement, clothesImage, clothesPrice, urlElement);
        document.querySelector("#clothes-cards").appendChild(card);
        
    }
    // document.querySelector("#clothes").textContent = data.name
    // A loop over data.response.docs
}

// End of Clothes API