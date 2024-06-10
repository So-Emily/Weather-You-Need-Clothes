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



// NEW EMILY CODE
// Google Images Restults API
// Google API: https://serpapi.com/images-results

const searchQueryClothes = document.querySelector("#search-input-clothes"); 
const searchBtnClothes = document.querySelector("#search-btn-clothes");

function handleSearchSubmitClothes() {
    const searchQuery = searchQueryClothes.value;
    if (!searchQuery) return;
    const apiUrl = `https://serpapi.com/search.json?q=${searchQuery}&engine=google_images&ijn=0&api_key=e2af61f71a0bb4b2a25dfb63bb2908098ab855b434ed712b45c48e56c44c97f6`;

    fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
        console.log('Data:', data); // log the data
        displaySearchResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    searchQueryClothes.value = "";
}

function displaySearchResults(data) {
    console.log('Displaying search results'); // log when this function is called
    
    // Display the search results on the page using the "clothes" id
    const clothesContainer = document.querySelector("#clothes");
    // Clear previous results
    clothesContainer.innerHTML = "";

    // Loop through the search results and create HTML elements to display them
    data.images_results.forEach(result => {
        const img = document.createElement("img");
        img.src = result.original;
        clothesContainer.appendChild(img);
    });
}

searchBtnClothes.addEventListener("click", handleSearchSubmitClothes);



