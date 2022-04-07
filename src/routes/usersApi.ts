import { Router } from "express";
import { privateRoute } from "../config/passport";

import * as UsersController from "../controllers/usersController";

const router = Router();

router.post('/login', UsersController.loginUser);
router.post('/register', UsersController.registerUser);

router.delete('/:id/delete_user', privateRoute, UsersController.deleteUser);

router.get('/:id/user', privateRoute, UsersController.userData);
router.get('/verify/:id/:token', UsersController.verifyEmail);
export default router;