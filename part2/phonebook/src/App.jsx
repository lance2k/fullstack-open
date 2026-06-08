import { useState, useEffect } from "react";
import { SearchInput } from "./components/SearchInput";
import { PersonForm } from "./components/PersonForm";
import { PersonsList } from "./components/PersonsList";
import axios from "axios";

function App() {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const personsToShow =
		searchTerm === ""
			? persons
			: persons.filter((person) =>
					person.name.toLowerCase().includes(searchTerm.toLowerCase()),
				);

	const addPerson = (event) => {
		event.preventDefault();

		if (persons.some((person) => person.name === newName)) {
			return alert(`${newName} is already added to phonebook`);
		}

		setPersons(
			persons.concat({
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			}),
		);
	};

	useEffect(() => {
		axios
			.get("http://localhost:3001/persons")
			.then((response) => {
				setPersons(response.data);
			})
			.catch((err) => {
				console.error("An error has occured: ", err);
			});
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<SearchInput
				searchTerm={searchTerm}
				handleSearchChange={handleSearchChange}
			/>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<PersonsList personsToShow={personsToShow} />
		</div>
	);
}

export default App;
