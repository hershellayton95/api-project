import express from "express";
import "express-async-errors";
import planetsRoutes from "./routes/planets"

import { validationMiddlewareError } from "./lib/middleware/validation";

import { initCorsMiddleware } from "./lib/middleware/cors";


const app = express();

app.use(express.json());
app.use(initCorsMiddleware())

app.use("/planets", planetsRoutes)

app.use(validationMiddlewareError)

export default app;
