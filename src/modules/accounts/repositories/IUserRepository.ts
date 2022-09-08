import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IUserRepository {
  create(data: IUserCreateDTO): Promise<void>;

  findByEmail(email: string): Promise<User>;

  findById(id: string): Promise<User>;
}

export { IUserRepository };
