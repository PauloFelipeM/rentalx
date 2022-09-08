import { NextFunction, Request, Response } from 'express';

import { AppError } from '@errors/AppError';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const userRepository = new UserRepository();
  const user = await userRepository.findById(request.user.id);

  if (!user.isAdmin) {
    throw new AppError('The User is not a admin!', 401);
  }

  next();
}
