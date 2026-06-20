require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");

const baseUrl = "/api";

app.use(express.json());
app.use(express.static("dist"));
morgan.token("body", (req) => {
	return JSON.stringify(req.body);
});
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get(`${baseUrl}/persons`, (req, res, next) => {
	Person.find({})
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			next(err);
		});
});

app.post(`${baseUrl}/persons`, (req, res, next) => {
	if (!req.body.name || !req.body.number) {
		return res.status(400).json({
			error: "name or number missing",
		});
	}

	const person = new Person({
		name: req.body.name,
		number: req.body.number,
	});

	person
		.save()
		.then((savedPerson) => {
			res.json(savedPerson);
		})
		.catch((err) => {
			next(err);
		});
});
app.get(`${baseUrl}/persons/:id`, (req, res, next) => {
	const id = req.params.id;
	Person.findById(id)
		.then((result) => {
			if (result) {
				res.json(result);
			} else {
				res.status(404).send("Person not found");
			}
		})
		.catch((err) => {
			next(err);
		});
});
app.put(`${baseUrl}/persons/:id`, (req, res, next) => {
	if (!req.body.name || !req.body.number) {
		return res.status(400).json({
			error: "name or number missing",
		});
	}
	const { name, number } = req.body;
	const id = req.params.id;

	Person.findById(id)
		.then((person) => {
			if (person) {
				person.name = name;
				person.number = number;

				return person.save().then((updatedPerson) => {
					res.json(updatedPerson);
				});
			} else {
				return res.status(404).send("Person not found");
			}
		})
		.catch((err) => {
			next(err);
		});
});

app.delete(`${baseUrl}/persons/:id`, (req, res, next) => {
	const id = req.params.id;
	Person.findByIdAndDelete(id)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			next(err);
		});
});

app.get(`${baseUrl}/info`, async (req, res) => {
	const timeStamp = new Date().toString();
	const personsLen = await Person.countDocuments({});
	res.send(`
    <div>Phonebook has info for ${personsLen} people</div>
    <br />
    <div>${timeStamp}</div>
    `);
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({
		error: "unknown endpoint",
	});
};

const errorHandler = (error, req, res, next) => {
	if (error.name === "CastError") {
		return res.status(400).send({
			error: "malformed id",
		});
	} else if (error.name === "ValidationError") {
		return res.status(400).json({
			error: error.message,
		});
	} else if (error.name === "MongoServerError" && error.code === 11000) {
		return res.status(400).json({
			error: "name must be unique",
		});
	}
	next(error);
};
app.use(unknownEndpoint);
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
