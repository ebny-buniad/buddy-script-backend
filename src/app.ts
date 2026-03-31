import express, { Application, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { IndexRoutes } from "./app/routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { auth } from "./app/lib/auth";
const app: Application = express();

app.all('/api/auth/*splat', toNodeHandler(auth));

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());


app.use("/api/v1", IndexRoutes)


// Global error handler
app.use(globalErrorHandler)

// Basic route
app.get('/', async (req: Request, res: Response) => {
    res.send('Buddy script server is running!');
});


export default app;