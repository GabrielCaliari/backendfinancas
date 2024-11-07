import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, avatarUrl } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      avatarUrl,
    });

    return response.json(user);
  }
}

export { CreateUserController };
