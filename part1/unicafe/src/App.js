import { useState } from "react";

//Header should get props.text
const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const Display = ({ state, text }) => {
    //gets the state and its corresponding text
    return (
        <>
            {text} {state}
            <br></br>
        </>
    );
};
const Total = ({ states }) => {
    // gets a list of objects containing all the states
    const init_val = 0;
    const all = states.reduce(
        (prev_count, count) => prev_count + count.state[0],
        init_val
    );
    return (
        <>
            all {all}
            <br></br>
        </>
    );
};
const Mean = ({ states }) => {
    // states is a list of objects containing
    // a list with the state and its score value
    // [{_: [_, _]}, ...]
    const init_val = [0, 0];
    const score = states.reduce(
        (prev_tuple, count) => [
            prev_tuple[0] + count.state[0],
            prev_tuple[1] + count.state[0] * count.state[1],
        ],
        init_val
    );
    return (
        <>
            average {score[1] / score[0]}
            <br></br>
        </>
    );
};

const Positive = ({ states }) => {
    const positive_count = states[0].state[0];
    const count = states.reduce(
        (prev_tuple, count) => prev_tuple + count.state[0],
        0
    );
    console.log("Count:", count);
    console.log("Positive:", positive_count);
    return (
        <>
            positive {positive_count / count}
            <br></br>
        </>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const states = [
        { state: [good, 1] },
        { state: [neutral, 0] },
        { state: [bad, -1] },
    ];

    //returning a function so that the event handler is simple
    const handleClickFn = (state, setter) => () => {
        const newState = state + 1;
        setter(newState);
    };

    return (
        <>
            <Header text="give feedback" />
            <Button handleClick={handleClickFn(good, setGood)} text="good" />
            <Button
                handleClick={handleClickFn(neutral, setNeutral)}
                text="neutral"
            />
            <Button handleClick={handleClickFn(bad, setBad)} text="bad" />
            <Header text="statistics" />

            <Display state={good} text="good" />
            <Display state={neutral} text="neutral" />
            <Display state={bad} text="bad" />

            <Total states={states} />
            <Mean states={states} />
            <Positive states={states} />
        </>
    );
};

export default App;
