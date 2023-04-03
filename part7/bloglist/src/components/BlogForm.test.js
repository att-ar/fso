import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> calls received handler with correct parameters", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const title = screen.getByPlaceholderText("title");
    const author = screen.getByPlaceholderText("author");
    const url = screen.getByPlaceholderText("url");

    const sendButton = screen.getByText("create");

    await user.type(title, "Title_test");
    await user.type(author, "Author_test");
    await user.type(url, "url_test");

    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    //func.mock.calls is a list inside a list, the inner list has the call params
    // [ [ { title: 'Title_test', author: 'Author_test', url: 'url_test' } ] ]
    expect(createBlog.mock.calls[0][0].title).toBe("Title_test");
    expect(createBlog.mock.calls[0][0].author).toBe("Author_test");
    expect(createBlog.mock.calls[0][0].url).toBe("url_test");
});
