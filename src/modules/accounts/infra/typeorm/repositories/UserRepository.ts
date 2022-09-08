import { getRepository, Repository } from 'typeorm';

import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUserRepository } from '../../../repositories/IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async create(data: IUserCreateDTO): Promise<void> {
    const user = this.repository.create(data);
    await this.repository.save(user);
  }
}

export { UserRepository };
