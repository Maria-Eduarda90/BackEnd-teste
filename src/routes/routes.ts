import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

const userController = new UserController;

router.get("/users/:id", userController.show);
router.post("/users", userController.handle);

export { router }