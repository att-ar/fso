import { useState } from "react";

//Header should get props.text
const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value, suffix = "" }) => {
    //gets the state and its corresponding text
    //adding style
    // <td style={{ border: "solid", backgroundColor: "lightblue" }}>{text} </td>;
    return (
        <tr>
            <td>{text}</td>
            <td>
                {value} {suffix}
            </td>
        </tr>
    );
};

const Statistics = ({ states }) => {
    const total = states.reduce(
        (prev_state, cur_state) => prev_state + cur_state.state[0],
        0
    );

    console.log("total inside Statistics:", total);
    if (total > 0) {
        const good_tuple = states[0].state;
        const neutral_tuple = states[1].state;
        const bad_tuple = states[2].state;

        const mean_score =
            (good_tuple[0] * good_tuple[1] +
                neutral_tuple[0] * neutral_tuple[1] +
                bad_tuple[0] * bad_tuple[1]) /
            total;
        const positive_percent = (100 * good_tuple[0]) / total;

        console.log("mean score", mean_score);
        console.log("positive percent", positive_percent);

        return (
            <>
                <table>
                    <tbody>
                        <StatisticLine text="good" value={good_tuple[0]} />
                        <StatisticLine
                            text="neutral"
                            value={neutral_tuple[0]}
                        />
                        <StatisticLine text="bad" value={bad_tuple[0]} />
                        <StatisticLine text="all" value={total} />
                        <StatisticLine text="average" value={mean_score} />
                        <StatisticLine
                            text="positive"
                            value={positive_percent}
                            suffix="%"
                        />
                    </tbody>
                </table>
            </>
        );
    } else {
        return <p>No feedback given</p>;
    }
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
            <div>
                <Header text="give feedback" />
                <Button
                    handleClick={handleClickFn(good, setGood)}
                    text="good"
                />
                <Button
                    handleClick={handleClickFn(neutral, setNeutral)}
                    text="neutral"
                />
                <Button handleClick={handleClickFn(bad, setBad)} text="bad" />
            </div>

            <div>
                <Header text="statistics" />
                <Statistics states={states} />
            </div>
        </>
    );
};

export default App;
