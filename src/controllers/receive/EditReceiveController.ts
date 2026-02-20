import { Request, Response } from 'express';
import { EditReceiveService } from '../../services/receive/EditReceiveService';

class EditReceiveController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { description, value, type, payment_method } = request.body;
    const user_id = request.user_id!;

    const editReceiveService = new EditReceiveService();
    const updatedReceive = await editReceiveService.execute({
      id,
      user_id,
      description,
      value,
      type,
      payment_method,
    });

    return response.json(updatedReceive);
  }
}

export { EditReceiveController };
