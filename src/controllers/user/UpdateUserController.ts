import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/user/UpdateUserService';

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, password, avatarUrl } = request.body;

    const updateUserService = new UpdateUserService();

    try {
      const user = await updateUserService.execute({
        id,
        name,
        email,
        password,
        avatarUrl,
      });

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { UpdateUserController };
