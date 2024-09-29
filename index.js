// Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "b3454e0af9ed2bf5ea18cbdadbba05d8"; // Ensure your actual API key is used

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value.trim(); // Trim to remove unnecessary spaces

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("Could not fetch weather data. Please check the city name or try again.");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    // Use template literals for dynamic values
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.textContent = ""; // Clear previous content
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // Display temperature in Fahrenheit since you're using `imperial` units
    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${temp.toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `Weather: ${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id); // Use emoji based on weather condition ID

    // Add styles
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Append elements to the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// Function to get weather emoji based on weather condition ID
function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"; // Mist, Fog
        case (weatherId === 800):
            return "☀️"; // Clear sky
        case (weatherId >= 801 && weatherId < 810):
            return "☁️"; // Clouds
        default:
            return "🌡️"; // Default weather emoji
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = ""; // Clear previous content
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
