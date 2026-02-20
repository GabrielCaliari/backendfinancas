import prismaClient from "../../prisma";
import { NotFoundError } from "../../errors/AppError";
import { requireOwnership } from "../../helpers/requireOwnership";

interface ReceiveRequest {
  item_id: string;
  user_id: string;
}

class DeleteReceiveService {
  async execute({ item_id, user_id }: ReceiveRequest) {
    await prismaClient.$transaction(async (tx) => {
      const receive = await tx.receive.findUnique({
        where: { id: item_id },
      });

      if (!receive) {
        throw new NotFoundError("Movimentação não encontrada");
      }

      requireOwnership(receive.user_id, user_id);

      const user = await tx.user.findUnique({
        where: { id: user_id },
      });
      if (!user) throw new NotFoundError("Usuário não encontrado");

      const newBalance =
        receive.type === "despesa"
          ? user.balance + receive.value
          : user.balance - receive.value;

      await tx.receive.delete({
        where: { id: item_id },
      });

      await tx.user.update({
        where: { id: user_id },
        data: { balance: newBalance },
      });
    });

    return { status: "updated" };
  }
}

export { DeleteReceiveService };
