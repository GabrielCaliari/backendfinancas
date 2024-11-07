// src/controllers/receive/EditReceiveController.ts

import { Request, Response } from 'express';
import { EditReceiveService } from '../../services/receive/EditReceiveService';

class EditReceiveController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { description, value, type, payment_method } = request.body;

    const editReceiveService = new EditReceiveService();

    try {
      const updatedReceive = await editReceiveService.execute({
        id,
        description,
        value,
        type,
        payment_method,
      });

      return response.json(updatedReceive);
    } catch (error) {
      console.error("Erro ao editar recebimento:", error); // Log detalhado
      return response.status(500).json({
        error: 'Erro ao editar recebimento.',
        details: error.message || error, // Enviar detalhes para o frontend
      });
    }
  }
}

export { EditReceiveController };
