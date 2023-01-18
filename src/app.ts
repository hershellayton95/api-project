import express from "express";
import "express-async-errors";
import planetsRoutes from "./routes/planets";
import authRoutes from "./routes/auth";

import { validationMiddlewareError } from "./lib/middleware/validation";
import { initCorsMiddleware } from "./lib/middleware/cors";
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport";

const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(initCorsMiddleware());



app.use("/planets", planetsRoutes);
app.use("/auth", authRoutes);
app.use(validationMiddlewareError);

export default app;
