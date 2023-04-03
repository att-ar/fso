Cypress.Commands.add("login", ({ username, password }) => {
    cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
        username,
        password,
    }).then(({ body }) => {
        localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
        cy.visit("");
    });
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
    cy.request({
        url: `${Cypress.env("BACKEND")}/blogs`,
        method: "POST",
        body: { title, author, url },
        //assumes someone is logged in
        headers: {
            Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loggedBlogappUser")).token
            }`,
        },
    });

    cy.visit("");
});

Cypress.Commands.add("likeBlogNTimes", (blog, n) => {
    let likes = blog.likes;
    cy.contains(blog.title).as("blog");
    cy.get("@blog").contains("like").as("like");
    cy.get("@blog").contains("show").click();
    for (let i = 0; i < n; i++) {
        cy.get("@like").click();
        cy.get("@blog").contains(`likes: ${likes + 1}`);
        likes++;
    }
    cy.get("@blog").contains(`likes: ${likes}`);
    cy.visit("");
});
