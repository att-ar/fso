import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title and author only, at first", () => {
    const user = {
        token: "sometoken",
        username: "user1",
        name: "name1",
    };
    const blog = {
        title: "Title1",
        author: "author1",
        url: "url1",
        like: 2,
        user: { username: user.username, name: user.name, id: "90909" },
    };

    const mockLike = jest.fn();
    const mockDelete = jest.fn();

    render(
        <Blog
            user={user}
            blog={blog}
            handleDelete={mockDelete}
            handleLike={mockLike}
        />
    );

    const element = screen.queryByText("url");
    expect(element).toBeNull();
});

test("renders url and likes when show is clicked", async () => {
    const user = {
        token: "sometoken",
        username: "user1",
        name: "name1",
    };
    const blog = {
        title: "Title1",
        author: "author1",
        url: "url1",
        like: 2,
        user: { username: user.username, name: user.name, id: "90909" },
    };

    const mockLike = jest.fn();
    const mockDelete = jest.fn();

    render(
        <Blog
            user={user}
            blog={blog}
            handleDelete={mockDelete}
            handleLike={mockLike}
        />
    );

    const person = userEvent.setup();
    const button = screen.getByText("show");
    await person.click(button);
    // screen.debug(button);
    const element = screen.queryByText("url");
    expect(element).toBeDefined();
});

test("like handler is called twice when liked twice", async () => {
    const user = {
        token: "sometoken",
        username: "user1",
        name: "name1",
    };
    const blog = {
        title: "Title1",
        author: "author1",
        url: "url1",
        like: 2,
        user: { username: user.username, name: user.name, id: "90909" },
    };

    const mockLike = jest.fn();
    const mockDelete = jest.fn();

    render(
        <Blog
            user={user}
            blog={blog}
            handleDelete={mockDelete}
            handleLike={mockLike}
        />
    );

    const person = userEvent.setup();
    const button = screen.getByText("show");
    await person.click(button);
    // screen.debug(button);
    const like = screen.getByText("like");
    // screen.debug(like);
    await person.click(like);
    await person.click(like);
    expect(mockLike.mock.calls).toHaveLength(2);
});
