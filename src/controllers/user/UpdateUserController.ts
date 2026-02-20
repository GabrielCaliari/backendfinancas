import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/user/UpdateUserService';
import { ForbiddenError } from '../../errors/AppError';

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const idFromUrl = request.params.id;
    const requestUserId = request.user_id;
    if (idFromUrl !== requestUserId) {
      throw new ForbiddenError('Acesso negado ao recurso');
    }
    const { name, email, password, avatarUrl } = request.body;

    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute({
      id: idFromUrl,
      name,
      email,
      password,
      avatarUrl,
    });

    return response.json(user);
  }
}

export { UpdateUserController };
