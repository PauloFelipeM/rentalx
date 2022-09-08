import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';

interface IUserTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;

  deleteById(id: string);
}

export { IUserTokenRepository };
