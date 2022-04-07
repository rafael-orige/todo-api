import { Request, Response } from "express";
import { Todo } from "../models/Todo";
import { User } from "../models/User"; //Needed to check user id before creating a new todo

export const listAllTodosStored = async (req: Request, res: Response) => {
    let todos = await Todo.findAll();

    if (todos.length > 0) {
        res.status(200)
        res.json({ todos });
    } else {
        res.status(400);
        res.json({ error: "There are no todos." });
    }
};


export const listAllUserTodos = async (req: Request, res: Response) => {
    try {
        let todos = await Todo.findAll({
            where: { user_id: req.headers.id },
            order: [
                ['todo_id', 'DESC']
            ]
        })

        if (todos.length === 0) {
            res.status(200);
        } else if (todos && todos.length > 0) {
            res.status(200)
            res.json({ todos })
        }
    } catch (error) {
        res.status(400);
        res.json({ error: `Something bad happened. ${error}` })
    }
};

export const deleteUserTodo = async (req: Request, res: Response) => {
    try {
        let checkUser = await User.findOne({
            where: { user_id: req.params.id }
        })

        if (checkUser) {
            try {
                let deleteTodo = await Todo.destroy({
                    where: { todo_id: req.headers.id, user_id: req.params.id }
                })
                res.status(200);
                res.json({ status: true, message: "Selected todo deleted.", deleteTodo });
            } catch (error) {
                res.status(400);
                res.json({ status: false, error: error });
            }
        }
    } catch (error) {
        res.status(400);
        res.json({ error: `Something bad happened. ${error}` })
    }
}


export const deleteAllCompletedTodos = async (req: Request, res: Response) => {
    try {
        let completedTodos = await Todo.findAll({
            where: { user_id: req.params.id, completed: true }
        });

        if (completedTodos.length > 0) {
            await Todo.destroy({
                where: { user_id: req.params.id, completed: true }
            });

            res.json({ status: "Todas as tarefas que estavam completas foram deletadas." });
        } else {
            res.json({ status: "Não há tarefas completas para serem deletadas.", deleted: completedTodos });
        }
    } catch (error) {
        res.status(400);
        res.json({ error: `Something bad happened. ${error}` })
    }
}

export const createTodo = async (req: Request, res: Response) => {
    try {
        let checkUser = await User.findOne({
            where: { user_id: req.params.id }
        })
        if (checkUser) {
            let newTodo = await Todo.create({
                todo_text: req.body.text,
                user_id: req.params.id,
                completed: false
            })

            if (newTodo) {
                res.json({
                    status: "Todo criado com sucesso.",
                    newTodo
                })
            } else {
                res.status(400);
                res.json({ error: "Aconteceu algo errado" });
            }
        } else {
            res.status(400);
            res.json({ error: "Não existe usuário com este id. Não será possível criar uma nova tarefa." })
        }
    } catch (error) {
        res.status(400);
        res.json({ error: `Something bad happened. ${error}` })
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        let checkUser = await User.findOne({
            where: { user_id: req.params.id }
        })

        if (checkUser) {
            let status = req.body.completed === "true" ? true : false;
            let updateTodo = await Todo.update({
                completed: status
            }, {
                where: { user_id: req.params.id, todo_id: req.body.id }
            })

            res.status(200);
            res.json({ status: true, updateTodo })
        } else {
            res.status(400);
            res.json({ status: false, error: "Aconteceu algo." });
        }
    } catch (error) {
        res.status(400);
        res.json({ error: `Something bad happened. ${error}` })
    }
}