import prismaClient from "../../prisma";
import { ValidationError, NotFoundError } from "../../errors/AppError";

class ListDetailUserService{
  async execute(user_id: string){
    if (!user_id) {
      throw new ValidationError("Usuário inválido");
    }

    const user = await prismaClient.user.findFirst({
      where:{
        id: user_id,
      },
      select:{
        id: true,
        name: true,
        email: true,
        balance: true,
        created_at: true,
        updated_at:true,
      }
    })

    if(user === null){
      throw new NotFoundError("Usuário não encontrado");
    }

    return user;

  }
}

export { ListDetailUserService }