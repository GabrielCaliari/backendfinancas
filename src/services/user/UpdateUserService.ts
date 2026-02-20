import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import { NotFoundError, ValidationError } from '../../errors/AppError';

interface UserUpdateRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
}

class UpdateUserService {
  async execute({ id, name, email, password, avatarUrl }: UserUpdateRequest) {
    const userExists = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundError('Usuário não encontrado');
    }

    if (email) {
      const userWithEmail = await prismaClient.user.findFirst({
        where: {
          email,
          NOT: { id },
        },
      });

      if (userWithEmail) {
        throw new ValidationError('Email já está em uso');
      }
    }

    const updatedData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password: await hash(password, 8) }),
      ...(avatarUrl && { avatarUrl }), 
    };

    const user = await prismaClient.user.update({
      where: { id },
      data: updatedData,
      select: {
        id: true,
        name: true,
        email: true,
        balance: true,
        avatarUrl: true, 
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }
}

export { UpdateUserService };
