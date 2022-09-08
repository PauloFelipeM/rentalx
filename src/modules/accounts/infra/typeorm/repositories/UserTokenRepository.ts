import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';

class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const user = this.repository.create(data);
    await this.repository.save(user);
    return user;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return await this.repository.findOne({ user_id, refresh_token });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UserTokenRepository };
