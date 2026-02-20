import prismaClient from "../../prisma";
import { ValidationError, NotFoundError } from "../../errors/AppError";

interface ReceiveRequest {
  description: string;
  value: number;
  type: string;
  date: string;
  user_id: string;
  payment_method: string;
}

class CreateReceiveService {
  async execute({ description, type, value, date, user_id, payment_method }: ReceiveRequest) {
    if (!user_id) {
      throw new ValidationError("Usuário inválido");
    }

    const validMethods = ["Dinheiro", "Crédito", "Débito", "Pix"];
    if (!validMethods.includes(payment_method)) {
      throw new ValidationError("Método de pagamento inválido");
    }

    const newReceive = await prismaClient.$transaction(async (tx) => {
      const findUser = await tx.user.findUnique({
        where: { id: user_id },
      });

      if (!findUser) {
        throw new NotFoundError("Usuário não encontrado");
      }

      const newBalance =
        type === "receita"
          ? findUser.balance + Number(value)
          : findUser.balance - Number(value);

      await tx.user.update({
        where: { id: user_id },
        data: { balance: newBalance },
      });

      const receive = await tx.receive.create({
        data: {
          description,
          type,
          value,
          date,
          user_id,
          payment_method,
        },
      });

      return receive;
    });

    return newReceive;
  }
}

export { CreateReceiveService };
