import { useState } from "react";
import { SearchInput } from "./components/SearchInput";
import { PersonForm } from "./components/PersonForm";
import { PersonsList } from "./components/PersonsList";

function App() {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
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
