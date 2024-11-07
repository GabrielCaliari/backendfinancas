import prismaClient from "../../prisma";

interface IRequest {
  id: string;
  description: string;
  value: number;
  type: string;
  payment_method: string;
}

class EditReceiveService {
  async execute({ id, description, value, type, payment_method }: IRequest) {
    // Busque a movimentação original antes da atualização
    const originalReceive = await prismaClient.receive.findUnique({
      where: { id },
    });

    if (!originalReceive) {
      throw new Error("Movimentação não encontrada");
    }

    // Atualize a movimentação com os novos dados
    const updatedReceive = await prismaClient.receive.update({
      where: { id },
      data: {
        description,
        value,
        type,
        payment_method,
      },
    });

    // Calcule a diferença entre o valor antigo e o novo
    const valueDifference = value - originalReceive.value;

    // Atualize o saldo do usuário no modelo User
    await prismaClient.user.update({
      where: { id: originalReceive.user_id },
      data: {
        balance: {
          increment: type === "receita" ? valueDifference : -valueDifference,
        },
      },
    });

    return updatedReceive;
  }
}

export { EditReceiveService };
