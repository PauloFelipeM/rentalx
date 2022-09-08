import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { UserTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokenRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  const userTokenRepository = new UserTokenRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: userId } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const user = await userTokenRepository.findByUserIdAndRefreshToken(
      userId,
      token
    );

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token!');
  }
}
