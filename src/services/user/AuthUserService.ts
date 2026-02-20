import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ValidationError } from '../../errors/AppError';

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: { email }
    });

    if (!user) {
      throw new ValidationError("Email ou senha incorretos");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new ValidationError("Email ou senha incorretos");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET não configurado');
    }
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      secret,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    );

    // Retorna os dados completos do usuário, incluindo email e avatarUrl
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl, // Inclui avatarUrl, se disponível
      token: token
    };
  }
}

export { AuthUserService };
