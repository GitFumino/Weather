const apiKey = 'c451d843f88eb355c4f99b11f0322dcb';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

const searchBox = document.querySelector('.top-display input');
const searchButton = document.querySelector('.top-display button');
const weatherIcon = document.querySelector('.weather-icon');

const date = new Date();
const todaysDate = date.toLocaleDateString('ig-ng');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  
  if (response.status === 404) {
    searchBox.value = '';
    document.getElementsByName('search-box')[0].placeholder = 'invalid input';
  } else {
    document.getElementsByName('search-box')[0].placeholder = '';

    let data = await response.json();

    document.querySelector('.city')
      .innerHTML = data.name + ' ~ ' + data.sys.country;
    document.querySelector('.temp')
      .innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity')
      .innerHTML = data.main.humidity + '%';
    document.querySelector('.wind')
      .innerHTML = data.wind.speed + ' KM/H';
    document.querySelector('.date')
      .innerHTML = todaysDate;
    document.querySelector('.feelslike')
      .innerHTML = Math.round(data.main.feels_like) + '°C';

      if (data.weather[0].main === 'Clouds') {
        weatherIcon.src = 'icons/icons8-partly-cloudy-day-100.png';
      } else if (data.weather[0].main === 'Rain') {
        weatherIcon.src = 'icons/icons8-rain-100.png';
      } else if (data.weather[0].main === 'Clear') {
        weatherIcon.src = 'icons/icons8-sun-100.png';
      } else if (data.weather[0].main === 'Snow') {
        weatherIcon.src = 'icons/icons8-snow-100.png';
      } else if (data.weather[0].main === 'Drizzle') {
        weatherIcon.src = 'icons/icons8-drizzle-cloud-100.png';
      } else if (data.weather[0].main === 'Mist') {
        weatherIcon.src = 'icons/icons8-haze-100.png';
      } else if (data.weather[0].main === 'Thunderstorm') {
        weatherIcon.src = 'icons/icons8-cloud-lightning-100.png';
      }
    }
}

searchButton.addEventListener('click', () => {
  checkWeather(searchBox.value);
  searchBox.value = '';
});

searchBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkWeather(searchBox.value);
    searchBox.value = '';
  }
});

function updateStyle() {
  let date = new Date();
  let hour = date.getHours();

  if (hour >= 20 || hour < 6) {
    document.getElementById('scene').href = '/styles/weather-app-night.css';
  } else {
    document.getElementById('scene').href = '/styles/weather-app-day.css';
  }
}

updateStyle();