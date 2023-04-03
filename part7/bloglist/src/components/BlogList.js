import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ user }) => {
    const blogs = useSelector((state) => state.blogs);

    return (
        <div id="blogs">
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => {
                    return <Blog key={blog.id} user={user} blog={blog} />;
                })}
        </div>
    );
};

BlogList.propTypes = {
    user: PropTypes.object.isRequired,
};
BlogList.displayName = "BlogList";

export default BlogList;
