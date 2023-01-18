import express, { Router } from 'express';

import prisma from "../lib/prisma/client";

import {
    validate,
    planetSchema,
    PlanetData

} from "../lib/middleware/validation";

import { initMulterMiddleware } from "../lib/middleware/multer";

const upload = initMulterMiddleware();

const router = Router();

router.get("/", async (request, response) => {
    const planets = await prisma.planet.findMany()

    response.json(planets);
});

router.get("/:id(\\d+)", async (request, response, next) => {
    const planetID = Number(request.params.id);

    const planet = await prisma.planet.findUnique({
        where: { id: planetID }
    })

    if (!planet) {
        response.status(404);
        return next(`Cannot GET /planets/${planetID}`);
    }

    response.json(planet);
});

router.post("", validate({ body: planetSchema }), async (request, response) => {
    const planetData: PlanetData = request.body;

    const planet = await prisma.planet.create({
        data: planetData
    })

    response.status(201).json(planet);
});

router.put("/:id(\\d+)", validate({ body: planetSchema }), async (request, response, next) => {
    const planetID = Number(request.params.id);
    const planetData: PlanetData = request.body;

    try {
        const planet = await prisma.planet.update({
            where: { id: planetID },
            data: planetData
        })

        response.status(201).json(planet);
    } catch (error) {
        response.status(404);
        next(`Cannot PUT /planets/${planetID}`);
    }
});

router.delete("/:id(\\d+)", async (request, response, next) => {
    const planetID = Number(request.params.id);

    try {
        await prisma.planet.delete({
            where: { id: planetID },
        })

        response.status(204).end();
    } catch (error) {
        response.status(404);
        next(`Cannot DELETE /planets/${planetID}`);
    }
});

router.post("/:id(\\d+)/photo",
    upload.single("photo"),
    async (request, response, next) => {

        if (!request.file) {
            response.status(400);
            return next("No file has uploaded")
        }
        const photoFilename = request.file.filename;
        const planetID = Number(request.params.id);

        try {
            await prisma.planet.update({
                where: { id: planetID },
                data: { photoFilename }
            })

            response.status(201).json({ photoFilename })
        } catch (error) {
            response.status(404);
            next(`Cannot POST /planets/${planetID}/photo`);
        }

    });

router.use("/photos", express.static("uploads"));

export default router;
