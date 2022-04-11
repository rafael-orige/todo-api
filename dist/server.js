"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const usersApi_1 = __importDefault(require("./routes/usersApi"));
const todoApi_1 = __importDefault(require("./routes/todoApi"));
dotenv_1.default.config();
const server = (0, express_1.default)();

server.use((0, cors_1.default)());
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
server.use(express_1.default.urlencoded({ extended: true }));
server.get('/ping', (req, res) => res.json({ pong: true }));
server.use(usersApi_1.default);
server.use(todoApi_1.default);
server.use((req, res) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});
const errorHandler = (err, req, res, next) => {
    res.status(400);
    console.log(err);
    res.json({ error: "Ocorreu algum erro." });
};
server.use(errorHandler);
const port = process.env.PORT || "8000";
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
