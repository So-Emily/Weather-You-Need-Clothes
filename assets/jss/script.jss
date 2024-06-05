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