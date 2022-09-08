import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

@injectable()
class CreateUserUserCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: IUserCreateDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}

export { CreateUserUserCase };
