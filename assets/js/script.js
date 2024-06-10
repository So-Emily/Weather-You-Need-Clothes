const apiKey = "7ab439372a6b7834b1058543aced3bee"
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")

function handleSearchSubmit() {
    const city = searchInput.value
    if (!city) return
    fetchWeather(city)
    searchInput.value = ""
}

function fetchWeather(city) {
    const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
    fetch(apiUrlWeather).then(res => res.json()).then(data => {
        console.log(data)
        displayWeather(data)
    })
}

function displayWeather(data) {
    document.querySelector("#city-name").textContent = data.name
    document.querySelector("#temp").textContent = data.main.temp
}

searchBtn.addEventListener("click", handleSearchSubmit)



// Images for clothes 
// API = https://serpapi.com/google-images-api

const searchBtnClothes = document.querySelector("#search-btn-clothes");
const searchInputClothes = document.querySelector("#search-input");
const apiKeyClothes = 'e2af61f71a0bb4b2a25dfb63bb2908098ab855b434ed712b45c48e56c44c97f6'; // replace with your API key
const cx = '07784ff1f36c3448f'; // replace with your Custom Search Engine ID

searchBtnClothes.addEventListener('click', function() {
    const searchQuery = `inurl:${searchInputClothes.value}`; // get value from input field;
    
    

    fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKeyClothes}&cx=${cx}&q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            // handle the data here
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function handleSearchSubmitClothes() {
    const clothes = searchInputClothes.value
    if (!clothes) return
    fetchClothes(clothes)
    searchInputClothes.value = ""
}

function fetchClothes(clothes) {
    const apiUrlClothes = `https://serpapi.com/search?engine=google_images&api_key=${apiKeyClothes}&q=${clothes}`
    fetch(apiUrlClothes).then(res => res.json()).then(data => {
        console.log(data)
        displayClothes(data)
    })
}

function displayClothes(data) {
    const clothesDiv = document.querySelector("#clothes");
    clothesDiv.innerHTML = ""; 

    if (data.images_results) {
        data.images_results.forEach(image => {
            const img = document.createElement("img");
            img.src = image.thumbnail;
            clothesDiv.appendChild(img);
        });
    }
}

searchBtnClothes.addEventListener("click", handleSearchSubmitClothes)
