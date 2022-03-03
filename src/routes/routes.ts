import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { CreateUserController } from '../controllers/CreateUserController';
import { GetAllUserController } from '../controllers/GetAllUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import { UpdateUserController } from '../controllers/UpdateUserController';

const router = Router();

router.get("/users", new GetAllUserController().index);
router.post("/users", new CreateUserController().create);
router.delete("/users/:id", new DeleteUserController().delete);
router.put("/users/:id", new UpdateUserController().update);

export { router }