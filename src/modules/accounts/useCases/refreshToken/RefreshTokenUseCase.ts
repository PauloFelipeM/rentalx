import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ) {}

  async execute(token: string): Promise<string> {
    const {
      secret_refresh_token,
      expires_refresh_token,
      expires_in_refresh_token,
    } = auth;

    const { email, sub: userId } = verify(
      token,
      secret_refresh_token
    ) as IPayload;

    const userToken =
      await this.userTokenRepository.findByUserIdAndRefreshToken(userId, token);

    if (!userToken) {
      throw new AppError('Refresh token dos not exists!');
    }

    await this.userTokenRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: userId,
      expiresIn: expires_in_refresh_token,
    });

    const date = new Date();
    date.setDate(date.getDate() + expires_refresh_token);

    await this.userTokenRepository.create({
      user_id: userId,
      refresh_token,
      expires_date: date.toString(),
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
