import { Router } from "express";
import * as TodosController from "../controllers/todosController";
import { privateRoute } from "../config/passport";

const router = Router();

router.get('/:id/Todos', privateRoute, TodosController.listAllUserTodos);
router.post('/:id/create_todo', privateRoute, TodosController.createTodo);
router.delete('/:id/delete_todo', privateRoute, TodosController.deleteUserTodo);
router.delete('/:id/delete_completed_todos', privateRoute, TodosController.deleteAllCompletedTodos);
router.put('/:id/update_todo', privateRoute, TodosController.updateTodo);

export default router;