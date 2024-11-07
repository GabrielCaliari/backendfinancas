import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      "4f93ac9d10cb751b8c9c646bc9dbccb9", // Substitua por uma chave segura em variáveis de ambiente
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
