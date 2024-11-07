// controllers/user/UpdateUserPasswordController.ts
import { Request, Response } from 'express';
import { UpdateUserPasswordService } from '../../services/user/UpdateUserPasswordService';

class UpdateUserPasswordController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { currentPassword, newPassword } = request.body;

    const updateUserPasswordService = new UpdateUserPasswordService();

    try {
      await updateUserPasswordService.execute({
        id,
        currentPassword,
        newPassword,
      });

      return response.status(204).send(); // No Content
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { UpdateUserPasswordController };
