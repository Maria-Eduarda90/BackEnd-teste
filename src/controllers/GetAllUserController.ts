import { Request, Response } from 'express';
import { GetAllUserServices } from "../services/GetAllUserServices";

class GetAllUserController {
    async index(request: Request, response: Response){
        const userService = new GetAllUserServices();

        const user = await userService.execute();

        return response.json(user)
    }
}

export { GetAllUserController }