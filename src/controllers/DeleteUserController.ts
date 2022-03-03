import { Request, Response } from 'express';
import { DeleteUserServices } from '../services/DeleteUserServices';

class DeleteUserController {
    async delete(request: Request, response: Response){
        const { id } = request.params;

        const service = new DeleteUserServices();

        const result = await service.execute(id);

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}

export { DeleteUserController }