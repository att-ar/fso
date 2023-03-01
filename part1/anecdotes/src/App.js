import { useState } from "react";

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const zero_pad = new Array(anecdotes.length).fill(0);
    const [votes, setVotes] = useState(zero_pad);

    //returns a function
    const handleRandom = (setter_select) => () => {
        const rand_idx = Math.floor(Math.random() * anecdotes.length);
        // might end up the same value as selected.
        setter_select(rand_idx);
    };
    const handleVote = (setter_vote) => () => {
        const new_votes = [...votes];
        new_votes[selected] += 1;
        setter_vote(new_votes);
    };
    const cur_max = { index: 0 };
    votes.forEach((vote, idx) => {
        if (vote > votes[cur_max.index]) {
            cur_max.index = idx;
        }
    });
    console.log("Votes array:", votes);
    console.log("Most voted anecdote:", anecdotes[cur_max.index]);
    return (
        <div>
            <h1>Anectode of the day</h1>
            <p>
                {anecdotes[selected]}
                <br></br>has {votes[selected]} votes
            </p>
            <Button handleClick={handleVote(setVotes)} text="vote" />
            <Button
                handleClick={handleRandom(setSelected)}
                text="next anecdote"
            />

            <h1>Anecdote with most votes</h1>
            {anecdotes[cur_max.index]}
        </div>
    );
};

export default App;
