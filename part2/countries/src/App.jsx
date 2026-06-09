import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import { Country } from "./components/Country";

function App() {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedCountry, setSelectedCountry] = useState(null);

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const filteredCountries =
		search === ""
			? countries
			: countries.filter((country) =>
					country.name.common.toLowerCase().includes(search.toLowerCase()),
				);

	const getAllCountries = () => {
		countriesService
			.getAll()
			.then((result) => {
				setCountries(result);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleShow = (name) => {
		setSelectedCountry(selectedCountry === name ? null : name);
	};

	useEffect(() => {
		getAllCountries();
	}, []);

	return (
		<>
			<div>
				find countries &nbsp;
				<input type="text" value={search} onChange={handleSearch} />
				{filteredCountries.length > 10 && search && (
					<div>Too many matches, specify another filter</div>
				)}
				{filteredCountries.length > 1 &&
					filteredCountries.length < 11 &&
					filteredCountries.map((country) => (
						<div key={country.name.common}>
							{country.name.common}{" "}
							<button onClick={() => handleShow(country.name.common)}>
								{selectedCountry === country.name.common ? "Hide" : "Show"}
							</button>
							{selectedCountry === country.name.common && (
								<Country country={country} />
							)}
						</div>
					))}
				{filteredCountries.length === 1 && (
					<Country country={filteredCountries[0]} />
				)}
			</div>
		</>
	);
}

export default App;
