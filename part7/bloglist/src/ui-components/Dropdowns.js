import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { LogInOutButton } from "./Buttons";

const Trigger = ({ name }) => (
    <span style={{ fontSize: 18, padding: 5 }}>Hello, {name}</span>
);

const makeOptions = (user, handleLogout) => [
    {
        key: "user",
        text: (
            <span>
                Signed in as <strong>{user.name}</strong>
            </span>
        ),
        disabled: true,
    },
    {
        key: "profile",
        text: <Link to={`/users/${user.id}`}>Your Profile</Link>,
    },
    {
        key: "sign-out",
        text: <LogInOutButton text={"Log Out"} onClick={handleLogout} />,
    },
];

export const ProfileDropdown = ({ user, handleLogout }) => {
    const options = makeOptions(user, handleLogout);
    return (
        <Dropdown
            icon="user circle"
            trigger={<Trigger name={user.name} />}
            options={options}
        />
    );
};
