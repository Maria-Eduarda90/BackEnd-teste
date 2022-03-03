import { Request, Response } from 'express';
import { CreateUserService } from "../services/CreateUserServices";

class CreateUserController {
    async create(request: Request, response: Response){
        const { name, email, password } = request.body;

        const userService = new CreateUserService();

        const user = await userService.execute({ name, email, password });

        return response.json(user);
    }
}

export { CreateUserController }