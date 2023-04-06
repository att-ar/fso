import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs);

    return (
        <div id="blogs">
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => {
                    return (
                        <div key={blog.id} className="blogList">
                            <Link className="link" to={`/blogs/${blog.id}`}>
                                &apos;{blog.title}&apos;{" "}
                                <span style={{ color: "brown" }}>by</span>{" "}
                                {blog.author}
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};

BlogList.displayName = "BlogList";

export default BlogList;
