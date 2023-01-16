import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock"

const request = supertest(app);




describe("Test Server", () => {
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

    describe("POST /planets", () => {
           test("valid", async () => {
           const planet ={
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
});


