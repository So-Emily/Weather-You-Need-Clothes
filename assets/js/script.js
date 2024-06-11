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
// If statement to use as glue
// --------------------------------------------------------------------------->
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '6a23a64c91mshed64ee6d1f4bfaep1f7c39jsn1eeb76e2d677',
        'x-rapidapi-host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
};
function fetchClothes(clothes,gender){
    const apiUrlClothes = `https://apidojo-forever21-v1.p.rapidapi.com/products/search?query=${clothes}&rows=20&start=0&gender=${gender}`;
    fetch(apiUrlClothes,options).then(res => res.json()).then(data => {
        console.log(data)
        displayClothes(data)
    })
}
fetchClothes ("jacket","Mens")
function displayClothes(data){
    document.querySelector("#clothes").textContent = data.name
// A loop over data.response.docs
}