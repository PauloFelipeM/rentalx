import { container } from 'tsyringe';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokenRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';
import { CarRepository } from '@modules/cars/infra/typeorm/repositories/CarRepository';
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICarRepository>('CarRepository', CarRepository);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
);
