import { useEffect, useState } from "react";
import openweatherService from "../services/openweather";

const iconUrl = "https://openweathermap.org/img/wn/";

export const Country = ({ country }) => {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		openweatherService
			.getCurrentWeather(
				country.capitalInfo.latlng[0],
				country.capitalInfo.latlng[1],
			)
			.then((result) => {
				setWeather(result);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>Capital {country.capital[0]}</div>
			<div>Area {country.area}</div>
			<h2>Languages</h2>
			<ul>
				{Object.values(country.languages).map((lang) => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<img src={country.flags.svg} alt={country.flags.alt} width={200} />
			<h2>Weather in {country.capital[0]}</h2>
			<div>
				Temperature{" "}
				{weather ? (weather.main?.temp - 273.15).toFixed(2) : "Loading..."}{" "}
				Celsius
			</div>
			{weather.weather && (
				<img
					src={`${iconUrl}${weather.weather[0]?.icon}@2x.png`}
					alt={`${weather.weather[0]?.description}`}
				/>
			)}
			<div>Wind {weather ? weather.wind?.speed : "..."} m/s</div>
		</div>
	);
};
