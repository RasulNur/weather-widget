const WEATHER_API_KEY: string = "8dcfc9268c16525eda1dcd155bef5596";
const IP_API_KEY: string = "7bd8e6f5207a4dfca326e7a0a8d2ed86";
const weatherWidget: HTMLDivElement | null =
    document.querySelector(".weather-widget");

interface IGetWeatherData {
    base?: string;
    clouds?: object;
    cod?: number;
    coord?: object;
    dt?: number;
    id?: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    name?: string;
    sys?: object;
    timezone?: number;
    visibility?: number;
    weather: {
        description: string;
        icon?: string;
        id?: number;
        main?: string;
    }[];
    wind?: object;
}

interface IGetUserIp {
    city: string;
    ip: string;
    latitude: string;
    longitude: string;
}

const render = async (): Promise<void> => {
    const ip = await getUserIP(IP_API_KEY);
    const { latitude, longitude, city } = ip;

    const weatherData = await getWeatherData(
        latitude,
        longitude,
        WEATHER_API_KEY
    );

    const { main, weather } = weatherData;
    const { temp, temp_max, temp_min, humidity, pressure } = main;
    const { description } = weather[0];
    getMarkup(temp, city, description, temp_max, temp_min, humidity, pressure);
};

const getUserIP = async (key: string): Promise<IGetUserIp> => {
    const ipRes = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${key}&fields=geo&excludes=ip,country_code2,country_code3,country_name,district,state_code,state_prov,zipcode`
    );
    return await ipRes.json();
};

const getWeatherData = async (
    latitude: string,
    longitude: string,
    key: string
): Promise<IGetWeatherData> => {
    const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
    );
    return await weatherRes.json();
};

const getMarkup = (
    temp: number,
    city: string,
    description: string,
    temp_max: number,
    temp_min: number,
    humidity: number,
    pressure: number
): void => {
    let html = `
		<div classname="weather-widget__top-wrapper">
			<div class="weather-widget__value">${Math.round(temp)}°C</div>
			<div class="weather-widget__main-info">
				<h1 class="weather-widget__city-name">${city}</h1>
				<p class="weather-widget__descr">${description}</p>
			</div>
		</div>
		<ul class="weather-widget__list">
			<li class="weather-widget__list-item">
				<p>Max temp: ${Math.round(temp_max)}°C</p>
			</li>
			<li class="weather-widget__list-item">
				<p>Min temp: ${Math.round(temp_min)}°C</p>
			</li>
			<li class="weather-widget__list-item">
				<p>Humidity: ${humidity}%</p>
			</li>
			<li class="weather-widget__list-item">
				<p>Pressure: ${pressure}</p>
			</li>
		</ul>
    `;
    weatherWidget!.innerHTML = html;
};

render();
