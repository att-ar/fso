const User = ({ user }) => {
    if (user) {
        return (
            <div>
                <h2>{user.name}</h2>
                <strong>added blogs</strong>
                <ul>
                    {user.blogs.map((blog) => (
                        <li key={blog.id}>{blog.title}</li>
                    ))}
                </ul>
            </div>
        );
    }
    return null;
};

export default User;
