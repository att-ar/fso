import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { Routes, Route, Link } from "react-router-dom";

const App = () => {
    const linkSpace = {
        margin: 5,
        padding: 4,
        borderRadius: 6,
        textDecoration: "none",
        background: "lightgreen",
    };
    return (
        <div>
            <div style={{ background: "green", borderRadius: 4 }}>
                <Link style={linkSpace} to="/">
                    authors
                </Link>
                <Link style={linkSpace} to="/books">
                    books
                </Link>
                <Link style={linkSpace} to="/add">
                    add
                </Link>
            </div>
            <Routes>
                <Route path="/" element={<Authors />} />
                <Route path="/books" element={<Books />} />
                <Route path="/add" element={<NewBook />} />
            </Routes>
        </div>
    );
};

export default App;
