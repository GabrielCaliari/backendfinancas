import prismaClient from "../../prisma";


interface ReceiveRequest {
  description: string;
  value: number;
  type: string;
  date: string;
  user_id: string;
  payment_method: string; // Adicionando o campo payment_method aqui
}


class CreateReceiveService {
  async execute({ description, type, value, date, user_id, payment_method }: ReceiveRequest) {

    if (!user_id) {
      throw new Error("Invalid user");
    }

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      }
    });

    if (!findUser) {
      throw new Error("User not found");
    }

    // Validação dos métodos de pagamento aceitos
    const validMethods = ['Dinheiro', 'Crédito', 'Débito', 'Pix'];
    if (!validMethods.includes(payment_method)) {
      throw new Error('Método de pagamento inválido');
    }

    // Atualizar o saldo de acordo com o tipo (receita ou despesa)
    if (type === "receita") {
      await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          balance: findUser.balance + Number(value),
        },
      });
    } else {
      await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          balance: findUser.balance - Number(value),
        },
      });
    }

    // Cria o registro com a nova coluna payment_method
    const newReceive = await prismaClient.receive.create({
      data: {
        description,
        type,
        value,
        date,
        user_id,
        payment_method, // Incluindo o payment_method
      },
    });

    return newReceive;
  }
}

export {CreateReceiveService}