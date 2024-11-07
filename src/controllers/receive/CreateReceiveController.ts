import { Request, Response } from 'express';
import { CreateReceiveService } from '../../services/receive/CreateReceiveService';

class CreateReceiveController {
  async handle(request: Request, response: Response) {
    const { 
      description, 
      value,
      type,
      date,
      payment_method // Incluindo o campo payment_method
    } = request.body;

    const user_id = request.user_id;

    const createReceiveService = new CreateReceiveService();

    const user = await createReceiveService.execute({
      description, 
      value,
      type,
      date,
      payment_method, // Passa para o serviço
      user_id,
    });

    return response.json(user);
  }
}

export { CreateReceiveController };