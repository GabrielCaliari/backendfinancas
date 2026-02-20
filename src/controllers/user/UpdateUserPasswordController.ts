import { Request, Response } from 'express';
import { UpdateUserPasswordService } from '../../services/user/UpdateUserPasswordService';
import { ForbiddenError } from '../../errors/AppError';

class UpdateUserPasswordController {
  async handle(request: Request, response: Response) {
    const idFromUrl = request.params.id;
    const requestUserId = request.user_id;
    if (idFromUrl !== requestUserId) {
      throw new ForbiddenError('Acesso negado ao recurso');
    }
    const { currentPassword, newPassword } = request.body;

    const updateUserPasswordService = new UpdateUserPasswordService();
    await updateUserPasswordService.execute({
      id: idFromUrl,
      currentPassword,
      newPassword,
    });

    return response.status(204).send();
  }
}

export { UpdateUserPasswordController };
