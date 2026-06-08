import { Person } from "./Person";

export const PersonsList = ({ personsToShow, handleDelete }) => {
	return personsToShow.map((person) => {
		return <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)} />;
	});
};
