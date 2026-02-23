import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import { ValidationError } from '../../errors/AppError';

interface UserRequest {
  name: string;
  email: string;
  password: string;
  balance?: number;
  avatarUrl?: string;
}

class CreateUserService {
  async execute({ name, email, password, balance = 0, avatarUrl }: UserRequest) {
    if (!email) {
      throw new ValidationError('Email inválido');
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new ValidationError('Usuário já existe com este email');
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        balance,
        avatarUrl, 
      },
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

export { CreateUserService };
