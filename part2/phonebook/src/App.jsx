import { useState, useEffect } from "react";
import { SearchInput } from "./components/SearchInput";
import { PersonForm } from "./components/PersonForm";
import { PersonsList } from "./components/PersonsList";
import personService from "./services/persons";
import { Notification } from "./components/Notification";

function App() {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [message, setMessage] = useState("");
	const [hasError, setHasError] = useState(false);

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
			if (
				!confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`,
				)
			) {
				return;
			}
			const selectedPerson = persons.find((p) => p.name === newName);

			const updatedPerson = {
				...selectedPerson,
				number: newNumber,
			};

			return personService
				.updatePerson(selectedPerson.id, updatedPerson)
				.then((person) => {
					setPersons((prev) =>
						prev.map((p) => (p.id === person.id ? person : p)),
					);
					setMessage(`${person.name} number changed`);
					setTimeout(() => {
						setMessage("");
					}, 5000);
				})
				.catch(() => {
					setHasError(true);
					setMessage(
						`Information of ${selectedPerson.name} has already been removed from the server`,
					);
					setTimeout(() => {
						setMessage("");
						setHasError(false);
					}, 5000);
				});
		}

		const newPerson = {
			name: newName,
			number: newNumber,
		};

		personService.addPerson(newPerson).then((person) => {
			setPersons(persons.concat(person));
			setNewName("");
			setNewNumber("");
			setMessage(`Added ${person.name}`);
			setTimeout(() => {
				setMessage("");
			}, 5000);
		});
	};
	const handleDelete = (id) => {
		const selectedPerson = personsToShow.find((p) => p.id === id);

		if (confirm(`Delete ${selectedPerson.name} ?`)) {
			personService.deletePerson(id).then((person) => {
				setPersons(persons.filter((p) => p.id !== person.id));
			});
		}
	};

	useEffect(() => {
		personService
			.getAll()
			.then((person) => {
				setPersons(person);
			})
			.catch((err) => {
				console.error("An error has occured: ", err);
			});
	}, []);

	const notificationStyle = hasError ? " error" : " success";

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				className={"message" + notificationStyle}
				message={message}
			/>
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
			<PersonsList personsToShow={personsToShow} handleDelete={handleDelete} />
		</div>
	);
}

export default App;
