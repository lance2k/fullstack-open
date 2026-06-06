import Course from "./Course";
export const Courses = ({ courses }) => {
	return courses.map((course) => <Course key={course.id} course={course} />);
};
