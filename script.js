const ipUrl = "http://ip-api.com/json";
const weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
const WEATHER_API_KEY = "8dcfc9268c16525eda1dcd155bef5596";
const weatherWidget = document.querySelector(".weather-widget");

async function weatherFetch(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        let html = `
		<div class="weather-widget__main-info">
			<h1 class="weather-widget__city-name">${data.name}</h1>
			<p class="weather-widget__descr">${data.weather[0].description}</p>
		</div>
		<div class="weather-widget__value">${Math.round(data.main.temp)}°C</div>
		
		<div class="weather-widget__additional-info">
			<ul class="weather-widget__list">
				<li class="weather-widget__list-item">
					<p>Max temp: ${Math.round(data.main.temp_max)}°C</p>
				</li>
				<li class="weather-widget__list-item">
					<p>Min temp: ${Math.round(data.main.temp_min)}°C</p>
				</li>
				<li class="weather-widget__list-item">
					<p>Humidity: ${data.main.humidity}%</p>
				</li>
				<li class="weather-widget__list-item">
					<p>Pressure: ${data.main.pressure}</p>
				</li>
			</ul>
		</div>
		`;

        weatherWidget.innerHTML = html;

        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function ipFetch(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        weatherFetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
    } catch (error) {
        console.log(error);
    }
}

ipFetch(ipUrl);
