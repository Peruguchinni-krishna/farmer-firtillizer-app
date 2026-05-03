async function getWeather() {
  const API_KEY = "YOUR_API_KEY";
  const weatherInfo = document.getElementById("weatherInfo");

  if (!API_KEY || API_KEY === "YOUR_API_KEY") {
    console.warn("OpenWeatherMap API key not set. Weather data will not be loaded.");
    if (weatherInfo) {
      weatherInfo.textContent = "Weather data is unavailable until an API key is configured.";
    }
    return;
  }

  const query = "Hyderabad";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error(`Weather fetch failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const message = `${data.name}: ${data.weather[0].description}, ${data.main.temp.toFixed(1)}°C`;

    if (weatherInfo) {
      weatherInfo.textContent = message;
    } else {
      console.log("Weather:", message);
    }
  } catch (error) {
    console.warn("Weather error:", error);
    if (weatherInfo) {
      weatherInfo.textContent = "Unable to load weather data.";
    }
  }
}

window.addEventListener("load", getWeather);