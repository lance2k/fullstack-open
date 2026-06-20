const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin-lance:${password}@cluster0.guazv0q.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
	id: String,
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
	Person.find({}).then((res) => {
		console.log("phonebook:");
		res.forEach((person) => {
			console.log(`${person.name} ${person.number}`);
		});
		mongoose.connection.close();
	});
} else {
	const person = new Person({
		name: process.argv[3] || "",
		number: process.argv[4] || "",
	});

	person.save().then((result) => {
		console.log(`added ${person.name} number ${person.number} to phonebook`);
		mongoose.connection.close();
	});
}
