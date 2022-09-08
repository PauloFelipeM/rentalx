import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';

class UserTokenRepositoryInMemory implements IUserTokenRepository {
  userTokens: UserToken[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, data);
    this.userTokens.push(userToken);

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    this.userTokens.filter((ut) => ut.id !== id);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.userTokens.find(
      (ut) => ut.id === user_id && ut.refresh_token === refresh_token
    );
  }
}

export { UserTokenRepositoryInMemory };
