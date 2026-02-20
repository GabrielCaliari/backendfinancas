import { ForbiddenError } from '../errors/AppError';

/**
 * Valida se o recurso pertence ao usuário da requisição.
 * Caso contrário, lança ForbiddenError (403).
 */
export function requireOwnership(resourceUserId: string, requestUserId: string | undefined): void {
  if (!requestUserId || resourceUserId !== requestUserId) {
    throw new ForbiddenError('Acesso negado ao recurso');
  }
}
