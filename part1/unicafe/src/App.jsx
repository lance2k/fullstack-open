import { useState } from "react";

export const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
	if (total < 1) {
		return <p>No feedback given</p>;
	}

	return (
		<table>
			<tbody>
				<StatisticLine text={"good"} value={good} />
				<StatisticLine text={"neutral"} value={neutral} />
				<StatisticLine text={"bad"} value={bad} />
				<StatisticLine text={"all"} value={total} />
				<StatisticLine text={"average"} value={average} />
				<StatisticLine text={"positive"} value={positive + " %"} />
			</tbody>
		</table>
	);
};

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const total = good + neutral + bad;
	const average = total === 0 ? 0 : (good - bad) / total;
	const positive = total === 0 ? 0 : (good / total) * 100;

	const handleGood = () => {
		const goodCount = good + 1;
		setGood(goodCount);
	};
	const handleNeutral = () => {
		const neutralCount = neutral + 1;
		setNeutral(neutralCount);
	};
	const handleBad = () => {
		const badCount = bad + 1;
		setBad(badCount);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<Button onClick={handleGood} text={"good"} />
			<Button onClick={handleNeutral} text={"neutral"} />
			<Button onClick={handleBad} text={"bad"} />
			<h2>statistics</h2>
			<Statistics
				good={good}
				bad={bad}
				neutral={neutral}
				total={total}
				average={average}
				positive={positive}
			/>
		</div>
	);
};

export default App;
