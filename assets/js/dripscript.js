window.onload = function() {
    
    const weatherData = JSON.parse(localStorage.getItem("weatherData"))
    if (weatherData) {
        // select the element to display the weather
        const cityNameElement = document.querySelector("#city-name")
        const tempElement = document.querySelector("#temp")

        // set the text content of the element to the city name and temp
        cityNameElement.textContent = weatherData.name;
        tempElement.textContent = weatherData.main.temp + "°F";
    }
}