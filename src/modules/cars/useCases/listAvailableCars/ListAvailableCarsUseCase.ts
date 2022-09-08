import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';

interface IRequest {
  column?: string;
  value?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {}

  async execute({ column, value }: IRequest): Promise<Car[]> {
    return await this.carRepository.findAvailable(column, value);
  }
}

export { ListAvailableCarsUseCase };
