import { Link } from "react-router-dom";

const Row = ({ user: { id, name, blogs } }) => (
    <>
        <td data-label="Name">
            <Link to={`/users/${id}`}>{name}</Link>
        </td>
        <td data-label="Blogs Created">{blogs.length}</td>
    </>
);

export const UsersTable = ({ users, username }) => (
    <table className="ui celled table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Blogs Created</th>
            </tr>
        </thead>
        <tbody>
            {users.map((u) =>
                u.username === username ? (
                    <tr style={{ backgroundColor: "lightcyan" }} key={u.id}>
                        <Row user={u} />
                    </tr>
                ) : (
                    <tr key={u.id}>
                        <Row user={u} />
                    </tr>
                )
            )}
        </tbody>
    </table>
);
