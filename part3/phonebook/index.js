const express = require("express");
const app = express();
const morgan = require("morgan");
let { Persons } = require("./db");

const baseUrl = "/api";

const generateId = () => {
	return (Math.random() * 999).toString();
};

app.use(express.json());
morgan.token("body", (req) => {
	return JSON.stringify(req.body);
});
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get(`${baseUrl}/persons`, (req, res) => {
	res.json(Persons);
});

app.post(`${baseUrl}/persons`, (req, res) => {
	if (!req.body.name || !req.body.number) {
		return res.status(400).json({
			error: "name or number missing",
		});
	}

	if (Persons.find((person) => person.name === req.body.name)) {
		return res.status(400).json({
			error: "name must be unique",
		});
	}

	const newNote = {
		id: generateId(),
		name: req.body.name,
		number: req.body.number,
	};

	Persons = Persons.concat(newNote);

	res.json(newNote);
});
app.get(`${baseUrl}/persons/:id`, (req, res) => {
	const id = req.params.id;
	const person = Persons.find((person) => {
		return person.id === id;
	});

	if (person) {
		res.json(person);
	} else {
		res.status(404).send("Person not found");
	}
});

app.delete(`${baseUrl}/persons/:id`, (req, res) => {
	const id = req.params.id;
	Persons = Persons.filter((person) => {
		return person.id !== id;
	});

	res.status(204).end();
});

app.get(`${baseUrl}/info`, (req, res) => {
	const timeStamp = new Date().toString();
	const personsLen = Persons.length;
	res.send(`
    <div>Phonebook has info for ${personsLen} people</div>
    <br />
    <div>${timeStamp}</div>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
