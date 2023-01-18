import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock"

const request = supertest(app);




describe("Test Server", () => {
    describe("GET request", () => {
        test("GET /planets", async () => {
            const planets = [
                {
                    "id": 1,
                    "name": "Mercury",
                    "description": null,
                    "dimension": 1234,
                    "moon": 0,
                    "createdAt": "2023-01-16T16:18:22.543Z",
                    "updateAt": "2023-01-16T18:08:17.255Z"
                },
                {
                    "id": 2,
                    "name": "Venus",
                    "description": null,
                    "dimension": 1234,
                    "moon": 0,
                    "createdAt": "2023-01-16T16:44:34.514Z",
                    "updateAt": "2023-01-16T16:44:34.514Z"
                }
            ];
            // @ts-ignore
            prismaMock.planet.findMany.mockResolvedValue(planets);
            const response = await request
                .get("/planets")
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toEqual(planets);
        });
        describe("GET /planets/:id", () => {
            test("valid", async () => {
                const planet =
                {
                    "id": 1,
                    "name": "Mercury",
                    "description": null,
                    "dimension": 1234,
                    "moon": 0,
                    "createdAt": "2023-01-16T16:18:22.543Z",
                    "updateAt": "2023-01-16T18:08:17.255Z"
                };

                // @ts-ignore
                prismaMock.planet.findUnique.mockResolvedValue(planet);
                const response = await request
                    .get("/planets/1")
                    .expect(200)
                    .expect("Content-Type", /application\/json/);

                expect(response.body).toEqual(planet);
            });
            test("planet doesn't exist", async () => {

                // @ts-ignore
                prismaMock.planet.findUnique.mockResolvedValue(null);

                const response = await request
                    .get("/planets/150")
                    .expect(404)
                    .expect("Content-Type", /text\/html/);

                expect(response.text).toContain("Cannot GET /planets/150");
            });
            test("id isn't a number", async () => {

                const response = await request
                    .get("/planets/aaaa")
                    .expect(404)
                    .expect("Content-Type", /text\/html/);

                expect(response.text).toContain("Cannot GET /planets/aaa");
            });
        });
    });

    describe("POST /planets", () => {
        test("valid", async () => {
            const planet = {
                "id": 2,
                "name": "Venus",
                "description": null,
                "dimension": 1234,
                "moon": 0,
                "createdAt": "2023-01-16T16:44:34.514Z",
                "updateAt": "2023-01-16T16:44:34.514Z"
            }

            // @ts-ignore
            prismaMock.planet.create.mockResolvedValue(planet);
            const response = await request
                .post("/planets")
                .send({
                    "name": "Mercury",
                    "dimension": 1234,
                    "moon": 0
                })
                .expect(201)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toEqual(planet);
        });

        test("not valid", async () => {
            const planet = {
                moon: 0
            };
            const response = await request
                .post("/planets")
                .send(planet)
                .expect(422)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toEqual({
                errors: { body: expect.any(Array) }
            });
        });

    });

    describe("PUT /planets", () => {
        test("valid", async () => {
            const planet = {
                "id": 2,
                "name": "Venus",
                "description": "A Lovely Place",
                "dimension": 1234,
                "moon": 0,
                "createdAt": "2023-01-16T16:44:34.514Z",
                "updateAt": "2023-01-16T16:44:34.514Z"
            }

            // @ts-ignore
            prismaMock.planet.update.mockResolvedValue(planet);
            const response = await request
                .put("/planets/2")
                .send({
                    "name": "Mercury",
                    "description": "A Lovely Place",
                    "dimension": 1234,
                    "moon": 0
                })
                .expect(201)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toEqual(planet);
        });

        test("not valid", async () => {
            const planet = {
                moon: 0
            };
            const response = await request
                .put("/planets/2")
                .send(planet)
                .expect(422)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toEqual({
                errors: { body: expect.any(Array) }
            });
        });
        test("planet doesn't exist", async () => {

            // @ts-ignore
            prismaMock.planet.update.mockRejectedValue(new Error("Error"));

            const response = await request
                .put("/planets/150")
                .send({
                    "name": "Mercury",
                    "description": "A Lovely Place",
                    "dimension": 1234,
                    "moon": 0
                })
                .expect(404)
                .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("Cannot PUT /planets/150");
        });
        test("id isn't a number", async () => {

            const response = await request
                .put("/planets/aaaa")
                .expect(404)
                .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("Cannot PUT /planets/aaa");
        });
    });

    describe("DELETE /planets", () => {
        test("valid", async () => {

            const response = await request
                .delete("/planets/2")
                .expect(204)

            expect(response.text).toEqual("");
        });

        test("planet doesn't exist", async () => {
            // @ts-ignore
            prismaMock.planet.delete.mockRejectedValue(new Error("Error"));

            const response = await request
                .delete("/planets/150")
                .expect(404)
                .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("Cannot DELETE /planets/150");
        });
        test("id isn't a number", async () => {

            const response = await request
                .delete("/planets/aaaa")
                .expect(404)
                .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("Cannot DELETE /planets/aaa");
        });
    });

    describe("POST planet/:id/photo", () => {
        test("valid png", async () => {

            await request
                .post("/planets/23/photo")
                .attach("photo", "test-features/photos/file.png")
                .expect(201)

        });

        test("valid jpg", async () => {

            await request
                .post("/planets/23/photo")
                .attach("photo", "test-features/photos/file.jpg")
                .expect(201)

        });

        test("invalid txt", async () => {

            const response = await request
                .post("/planets/23/photo")
                .attach("photo", "test-features/photos/file.txt")
                .expect(500)
                .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("Error: The uploaded file must be a JPG or a PNG image");

        });

        test("planet doesn't exist", async () => {
            // @ts-ignore
            prismaMock.planet.update.mockRejectedValue(new Error("Error"));

            const response = await request
                .post("/planets/150/photo")
                .attach("photo", "test-features/photos/file.png")
                .expect(404)
                .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("Cannot POST /planets/150/photo");
        });

        test("id isn't a number", async () => {

            const response = await request
                .post("/planets/aaa/photo")
                .expect(404)
                .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("Cannot POST /planets/aaa/photo");
        });

        test("no file uploaded", async () => {

            const response = await request
                .post("/planets/23/photo")
                .expect(400)
                .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("No file has uploaded");
        });
    });
});

