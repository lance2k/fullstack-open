import { Person } from "./Person";

export const PersonsList = ({ personsToShow }) => {
	return personsToShow.map((person) => {
		return <Person key={person.id} person={person} />;
	});
};
