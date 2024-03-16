const apiKey = 'b90d29ced6a181b5f22afa761472eab8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('icon');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

async function fetchWeather(location) {
    // "https://openweathermap.org/img/wn/02d@2x.png"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod == 200) {
            document.querySelector('.card').style.display = 'flex';
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)} °C`;
            iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            humidityElement.textContent = data.main.humidity + '%';
            windElement.textContent = data.wind.speed + ' km/h';
            document.getElementById('error').style.display = 'none';
        } else {
            document.querySelector('.card').style.display = 'none';
            document.getElementById('error').style.display = 'block';
            document.getElementById('error').textContent = data.message+' !';
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
