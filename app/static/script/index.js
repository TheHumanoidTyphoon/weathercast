const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const APIKey = '76fae3e9940cd2b076ea8d41f4652a9e';

search.addEventListener('click', async () => {
  const city = document.querySelector('.search-box input').value.trim();
  if (city === '') return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    );

    if (!response.ok) {
      handleNotFound();
      return;
    }

    const data = await response.json();
    handleWeatherData(data);
  } catch (error) {
    handleError(error);
  }
});

function handleNotFound() {
  container.style.height = '400px';
  weatherBox.style.display = 'none';
  weatherDetails.style.display = 'none';
  error404.style.display = 'block';
  error404.classList.add('fadeIn');
}

function handleWeatherData(data) {
  const image = document.querySelector('.weather-box img');
  const temperature = document.querySelector('.weather-box .temperature');
  const description = document.querySelector('.weather-box .description');
  const humidity = document.querySelector('.weather-details .humidity span');
  const wind = document.querySelector('.weather-details .wind span');

  switch (data.weather[0].main) {
    case 'Clear':
      image.src = 'images/clear.png';
      break;

    case 'Rain':
      image.src = 'images/rain.png';
      break;

    case 'Snow':
      image.src = 'images/snow.png';
      break;

    case 'Clouds':
      image.src = 'images/cloud.png';
      break;

    case 'Haze':
      image.src = 'images/mist.png';
      break;

    default:
      image.src = '';
  }

  temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
  description.innerHTML = `${data.weather[0].description}`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

  weatherBox.style.display = '';
  weatherDetails.style.display = '';
  weatherBox.classList.add('fadeIn');
  weatherDetails.classList.add('fadeIn');
  container.style.height = '590px';
}

function handleError(error) {
  console.error('An error occurred:', error);
  alert('Oops! Something went wrong. Please try again.');
}