// services/user/UpdateUserPasswordService.ts
import { compare, hash } from 'bcryptjs';
import prismaClient from '../../prisma';

interface UserPasswordUpdateRequest {
  id: string;
  currentPassword: string;
  newPassword: string;
}

class UpdateUserPasswordService {
  async execute({ id, currentPassword, newPassword }: UserPasswordUpdateRequest) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Verifica a senha atual
    const passwordMatch = await compare(currentPassword, user.password);
    if (!passwordMatch) {
      throw new Error('Current password is incorrect');
    }

    // Atualiza a senha
    const hashedPassword = await hash(newPassword, 8);
    await prismaClient.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}

export { UpdateUserPasswordService };
