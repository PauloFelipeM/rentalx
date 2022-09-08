import { AppError } from '@errors/AppError';
import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { UserTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory';
import { CreateUserUserCase } from '@modules/accounts/useCases/createUser/CreateUserUserCase';

import { AuthenticateUserUserCase } from './AuthenticateUserUserCase';

let authenticateUserUseCase: AuthenticateUserUserCase;
let userRepostoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUserCase;
let userTokenRepositoryInMemory: UserTokenRepositoryInMemory;

const user: IUserCreateDTO = {
  driver_license: '000123',
  email: 'user@test.com',
  password: '1234',
  name: 'User Test',
};

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepostoryInMemory = new UserRepositoryInMemory();
    userTokenRepositoryInMemory = new UserTokenRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUserCase(
      userRepostoryInMemory,
      userTokenRepositoryInMemory
    );
    createUserUseCase = new CreateUserUserCase(userRepostoryInMemory);
  });

  it('should be able to authenticate in application', async () => {
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate in application with an nonexistent user', async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: `falseUser@teste.com`,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate in application with incorrect password', async () => {
    await expect(async () => {
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: `fail_${user.password}`,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
