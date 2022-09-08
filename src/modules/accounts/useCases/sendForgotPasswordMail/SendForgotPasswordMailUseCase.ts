import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';
import { AppError } from '@errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not exists!');
    }

    const token = uuidV4();

    const date = new Date();
    date.setDate(date.getHours() + 3);

    await this.userTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: date.toDateString(),
    });
  }
}

export { SendForgotPasswordMailUseCase };
