const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};
const CourseName = ({ name }) => <h2>{name}</h2>;

const Course = ({ course: { name, parts } }) => {
    const total = parts.reduce(
        (p_count, count) => p_count + count.exercises,
        0
    );
    console.log(name, parts);
    return (
        <div>
            <CourseName name={name} />
            <div>
                {parts.map((part) => (
                    <Part
                        key={"parts_" + part.id}
                        name={part.name}
                        exercises={part.exercises}
                    />
                ))}
                <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>
            </div>
        </div>
    );
};

export default Course;
