import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock"

const request = supertest(app);

const planets = [
    {
        "id": 1,
        "name": "Mercury",
        "description": "",
        "moon": 0,
        "createdAt": "2023-01-16T09:51:46.977Z",
        "updateAt": "2023-01-16T09:51:54.283Z"
    },
    {
        "id": 2,
        "name": "Venus",
        "description": "",
        "moon": 0,
        "createdAt": "2023-01-16T09:52:14.329Z",
        "updateAt": "2023-01-16T09:52:19.247Z"
    }
];

// @ts-ignore
prismaMock.planet.findMany.mockResolvedValue(planets);

describe("Test Server", () => {
    test("GET /planets", async () => {

        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planets);
    });

    describe("POST /planets", ()=>{
        test("valid", async () => {
        const planet =   {
                name: "Mercury",
                moon: 0
            };
        const response = await request
            .post("/planets")
            .send(planet)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("not valid", async () => {
        const planet =   {
                moon: 0
            };
        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: { body: expect.any(Array)}
        });
    });

});

});


