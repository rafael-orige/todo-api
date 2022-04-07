"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.createTodo = exports.deleteAllCompletedTodos = exports.deleteUserTodo = exports.listAllUserTodos = exports.listAllTodosStored = void 0;
const Todo_1 = require("../models/Todo");
const User_1 = require("../models/User"); //Needed to check user id before creating a new todo
const listAllTodosStored = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let todos = yield Todo_1.Todo.findAll();
    if (todos.length > 0) {
        res.status(200);
        res.json({ todos });
    }
    else {
        res.status(400);
        res.json({ error: "There are no todos for this user" });
    }
});
exports.listAllTodosStored = listAllTodosStored;
const listAllUserTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let todos = yield Todo_1.Todo.findAll({
        where: { user_id: req.headers.id },
        order: [
            ['todo_id', 'DESC']
        ]
    });
    if (todos.length > 0) {
        res.status(200);
        res.json({ todos });
    }
    else {
        res.status(200);
        res.json({ error: "There are no todos for this user" });
    }
});
exports.listAllUserTodos = listAllUserTodos;
const deleteUserTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let checkUser = yield User_1.User.findOne({
        where: { user_id: req.params.id }
    });
    if (checkUser) {
        try {
            let deleteTodo = yield Todo_1.Todo.destroy({
                where: { todo_id: req.headers.id, user_id: req.params.id }
            });
            res.status(200);
            res.json({ status: true, message: "Selected todo deleted.", deleteTodo });
        }
        catch (error) {
            res.status(400);
            res.json({ status: false, error: error });
        }
    }
});
exports.deleteUserTodo = deleteUserTodo;
const deleteAllCompletedTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let completedTodos = yield Todo_1.Todo.findAll({
        where: { user_id: req.params.id, completed: true }
    });
    if (completedTodos.length > 0) {
        yield Todo_1.Todo.destroy({
            where: { user_id: req.params.id, completed: true }
        });
        res.json({ status: "Todas as tarefas que estavam completas foram deletadas." });
    }
    else {
        res.json({ status: "Não há tarefas completas para serem deletadas.", deleted: completedTodos });
    }
});
exports.deleteAllCompletedTodos = deleteAllCompletedTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let checkUser = yield User_1.User.findOne({
        where: { user_id: req.params.id }
    });
    if (checkUser) {
        let newTodo = yield Todo_1.Todo.create({
            todo_text: req.body.text,
            user_id: req.params.id,
            completed: false
        });
        if (newTodo) {
            res.json({
                status: "Todo criado com sucesso.",
                newTodo
            });
        }
        else {
            res.status(400);
            res.json({ error: "Aconteceu algo errado" });
        }
    }
    else {
        res.status(400);
        res.json({ error: "Não existe usuário com este id. Não será possível criar uma nova tarefa." });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let checkUser = yield User_1.User.findOne({
        where: { user_id: req.params.id }
    });
    if (checkUser) {
        let status = req.body.completed === "true" ? true : false;
        let updateTodo = yield Todo_1.Todo.update({
            completed: status
        }, {
            where: { user_id: req.params.id, todo_id: req.body.id }
        });
        res.status(200);
        res.json({ status: true, updateTodo });
    }
    else {
        res.status(400);
        res.json({ status: false, error: "Aconteceu algo." });
    }
});
exports.updateTodo = updateTodo;
