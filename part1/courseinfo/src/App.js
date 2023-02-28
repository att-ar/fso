const Header = ({ course }) => {
    // passed the course object into Header
    const name = course.name;
    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
};

const Part = ({ part, exercises }) => {
    return (
        <p>
            {part} {exercises}
        </p>
    );
};
const Content = ({ parts }) => {
    // passed the list into Content, not the course object
    return (
        <div>
            <Part part={parts[0].name} exercises={parts[0].exercises} />
            <Part part={parts[1].name} exercises={parts[1].exercises} />
            <Part part={parts[2].name} exercises={parts[2].exercises} />
        </div>
    );
};
const Total = ({ course }) => {
    // passed the course object into Total
    const parts = course.parts;
    const total_exercises = parts.reduce(
        (sum, curval) => sum + curval.exercises,
        0
    );
    return (
        <div>
            <p>Number of exercises {total_exercises}</p>
        </div>
    );
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };
    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total course={course} />
        </>
    );
};

export default App;
