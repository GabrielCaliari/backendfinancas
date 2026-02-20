import prismaClient from "../../prisma";
import { NotFoundError } from "../../errors/AppError";
import { requireOwnership } from "../../helpers/requireOwnership";

interface IRequest {
  id: string;
  user_id: string;
  description: string;
  value: number;
  type: string;
  payment_method: string;
}

class EditReceiveService {
  async execute({ id, user_id, description, value, type, payment_method }: IRequest) {
    const updatedReceive = await prismaClient.$transaction(async (tx) => {
      const originalReceive = await tx.receive.findUnique({
        where: { id },
      });

      if (!originalReceive) {
        throw new NotFoundError("Movimentação não encontrada");
      }

      requireOwnership(originalReceive.user_id, user_id);

      const updated = await tx.receive.update({
        where: { id },
        data: {
          description,
          value,
          type,
          payment_method,
        },
      });

      const user = await tx.user.findUnique({
        where: { id: originalReceive.user_id },
      });
      if (!user) throw new NotFoundError("Usuário não encontrado");

      // Reverter efeito da movimentação original no saldo
      const balanceAfterRevert =
        originalReceive.type === "despesa"
          ? user.balance + originalReceive.value
          : user.balance - originalReceive.value;

      // Aplicar efeito da nova movimentação
      const newBalance =
        type === "despesa"
          ? balanceAfterRevert - value
          : balanceAfterRevert + value;

      await tx.user.update({
        where: { id: originalReceive.user_id },
        data: { balance: newBalance },
      });

      return updated;
    });

    return updatedReceive;
  }
}

export { EditReceiveService };
