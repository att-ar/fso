const BlogForm = ({
    addBlog,
    newTitle,
    newAuthor,
    newUrl,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
}) => (
    <form onSubmit={addBlog}>
        <p>
            title: <input value={newTitle} onChange={handleTitleChange} />
            <br></br>
            author: <input value={newAuthor} onChange={handleAuthorChange} />
            <br></br>
            url: <input value={newUrl} onChange={handleUrlChange} />
            <br></br>
        </p>
        <button type="submit">create</button>
    </form>
);
export default BlogForm;
