import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';

interface UserRequest {
  name: string;
  email: string;
  password: string;
  balance?: number;
  avatarUrl?: string; // Novo campo
}

class CreateUserService {
  async execute({ name, email, password, balance = 0, avatarUrl }: UserRequest) {
    if (!email) {
      throw new Error('Email incorrect');
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        balance,
        avatarUrl, // Inclui avatarUrl na criação
      },
      select: {
        id: true,
        name: true,
        email: true,
        balance: true,
        avatarUrl: true, // Seleciona avatarUrl para ser retornado
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
