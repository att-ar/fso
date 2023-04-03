describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
        const user = {
            name: "Lily",
            username: "tears",
            password: "melatonin",
        };
        const user2 = {
            name: "Timmy",
            username: "root",
            password: "saranghae",
        };
        cy.request({
            url: `${Cypress.env("BACKEND")}/users`,
            method: "POST",
            body: user,
        });
        cy.request({
            url: `${Cypress.env("BACKEND")}/users`,
            method: "POST",
            body: user2,
        });
        cy.visit("");
    });

    it("Login form is shown", function () {
        cy.contains("Log in to application");
    });

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.contains("log in").click();
            cy.get("#username").type("tears");
            cy.get("#password").type("melatonin");
            cy.get("#login-button").click();

            cy.contains("Lily logged in");
        });

        it("fails with wrong credentials", function () {
            cy.contains("log in").click();
            cy.get("#username").type("tears");
            cy.get("#password").type("wrong");
            cy.get("#login-button").click();
            //check error message and that it is darkred (139,0,0)
            cy.get(".error")
                .should("contain", "wrong credentials")
                .and("have.css", "color", "rgb(139, 0, 0)")
                .and("have.css", "border-style", "solid");
            cy.get("html").should("not.contain", "Lily logged in");
        });
    });

    describe("When logged in", function () {
        beforeEach(function () {
            // the cy.login calls cy.visit("")
            cy.login({ username: "tears", password: "melatonin" });
        });

        it("A blog can be created", function () {
            cy.contains("New Blog").click();
            cy.get("#title").type("The Avatar is Aang");
            cy.get("#author").type("Katara");
            cy.get("#url").type("https://www.nickelodeon.com");

            cy.get("#submit-blog").click();

            cy.contains("The Avatar is Aang");
            //makes sure that the blog form is closed
            cy.get("html").should("not.contain", "#submit-blog");
        });

        describe("and there are some blogs", function () {
            beforeEach(function () {
                cy.createBlog({
                    title: "Surely you blog with 1 like",
                    author: "Fineokay",
                    url: "twitch.tv/fineokay",
                });
                cy.createBlog({
                    title: "Surely you blog with 2 likes",
                    author: "Weak3n",
                    url: "twitch.tv/Weak3n",
                });
                cy.createBlog({
                    title: "Surely you blog with 3 likes",
                    author: "Mast",
                    url: "yotube.com/Mast",
                });
            });

            it("A blog can be liked by a user", function () {
                cy.contains("Surely you blog with 3 likes").as("blog");
                cy.get("@blog").contains("show").click();
                cy.get("@blog").contains("0");
                cy.get("@blog").contains("like").click();
                cy.get("@blog").contains("1");
            });

            it("A blog can be deleted by its creator", function () {
                cy.contains("Surely you blog with 2 likes").as("blog");
                cy.get("@blog").contains("show").click();
                cy.get("@blog").parent().contains("remove").click();

                // I gave id="blogs" to the <div> container that renders the blogs
                cy.get("#blogs").should(
                    "not.contain",
                    "Surely you blog with 2 likes"
                );
            });

            it("Only the blog's creator can see its remove button", function () {
                // log in as different user
                cy.contains("log out").click();
                cy.login({ username: "root", password: "saranghae" });
                //check for the non existence of a remove button
                cy.contains("Surely you blog with 2 likes").as("blog");
                cy.get("@blog").contains("show").click();
                cy.get("@blog").parent().should("not.contain", "remove");
            });

            // something here removes the users from the blogs, might just click like instead of use the api
            it("blogs are listed in descending order of likes", function () {
                cy.request({
                    url: `${Cypress.env("BACKEND")}/blogs`,
                    method: "GET",
                }).then((response) => {
                    console.log(response.body);
                    const blogs = response.body;
                    let likes = 1;
                    for (let blog of blogs) {
                        cy.likeBlogNTimes(blog, likes);
                        likes++;
                    }
                });
                // now blogs should have 1,2,3 likes respectively
                // added className = "blog" to the <div> container
                // that renders the title, etc directly
                cy.get(".blog")
                    .eq(0)
                    .should("contain", "Surely you blog with 3 likes");
                cy.get(".blog")
                    .eq(1)
                    .should("contain", "Surely you blog with 2 likes");
                cy.get(".blog")
                    .eq(2)
                    .should("contain", "Surely you blog with 1 like");
            });
        });
    });
    // it("get all blogs", function () {
    //     cy.request("GET", "http://localhost:3003/api/blogs").then((res) => {
    //         console.log(res.body);
    //     });
    // });
});
