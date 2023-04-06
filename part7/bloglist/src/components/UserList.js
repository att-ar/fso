import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const UserList = () => {
    const users = useSelector((state) => state.users);

    if (users) {
        return (
            <div>
                <h2>Users</h2>
                <table id="users">
                    <tbody>
                        <tr>
                            <th>{null}</th>
                            <th>blogs created</th>
                        </tr>

                        {[...users]
                            .sort((a, b) => b.blogs.length - a.blogs.length)
                            .map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <Link to={`/users/${user.id}`}>
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td>{user.blogs.length}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }
    return null;
};

UserList.displayName = "UserList";

export default UserList;
