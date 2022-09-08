import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUserCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token,
    } = auth;

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const date = new Date();
    date.setDate(date.getDate() + expires_refresh_token);

    await this.userTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: date.toString(),
    });

    const tokenReturn: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUserCase };
