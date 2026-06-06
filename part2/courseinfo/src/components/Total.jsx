export const Total = ({ parts }) => {
	const total = parts.reduce((acc, part) => acc + part.exercises, 0);

	return <p style={{ fontWeight: "bold" }}>Total of {total} exercises</p>;
};
