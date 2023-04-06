import { useSelector } from "react-redux";
import { UsersTable } from "../ui-components/Tables";

const UserList = () => {
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);

    if (users) {
        return (
            <div>
                <h2>Users</h2>
                <UsersTable users={users} username={user.username} />
            </div>
        );
    }
    return null;
};

UserList.displayName = "UserList";

export default UserList;
