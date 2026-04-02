import express, { Application, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { IndexRoutes } from "./app/routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cors from 'cors';
import { auth } from "./app/lib/auth";
const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL, // client side url
    credentials: true
}))
// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', async (req: Request, res: Response) => {
    res.send('Buddy script server is running!');
});

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use("/api/v1", IndexRoutes)


// Global error handler
app.use(globalErrorHandler)

export default app;