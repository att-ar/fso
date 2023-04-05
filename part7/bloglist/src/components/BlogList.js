import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs);
    const user = useSelector((state) => state.user);
    console.log(blogs);
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

BlogList.displayName = "BlogList";

export default BlogList;
