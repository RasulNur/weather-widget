const WEATHER_API_KEY = "8dcfc9268c16525eda1dcd155bef5596";
const IP_API_KEY = "7bd8e6f5207a4dfca326e7a0a8d2ed86";
const weatherWidget = document.querySelector(".weather-widget");

async function ipFetch() {
    try {
        const res = await fetch(
            `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_API_KEY}&fields=geo`
        );
        const data = await res.json();
        weatherFetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${WEATHER_API_KEY}&units=metric`,
            data.city
        );
    } catch (error) {
        console.log(error);
    }
}

async function weatherFetch(url, city) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        let html = `
		<div class="weather-widget__main-info">
			<h1 class="weather-widget__city-name">${city}</h1>
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
    } catch (error) {
        console.log(error);
    }
}

ipFetch();
