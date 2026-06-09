import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

const getCurrentWeather = (lat, long) => {
	return axios
		.get(`${baseUrl}?lat=${lat}&lon=${long}&appid=${apiKey}`)
		.then((response) => response.data);
};

export default {
	getCurrentWeather,
};
