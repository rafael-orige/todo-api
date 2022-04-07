import express, { Response, Request, ErrorRequestHandler, NextFunction } from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/usersApi";
import todoRoutes from "./routes/todoApi";

dotenv.config();

const server = express();

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSucessStatus: 200
}

server.use(cors(corsOptions));

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use(userRoutes);
server.use(todoRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400);
    console.log(err);
    res.json({ error: "Ocorreu algum erro." });
}

server.use(errorHandler);

const port = process.env.PORT as string || "8000";
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})