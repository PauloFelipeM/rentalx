import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exists!');
    }

    carExists.specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    return await this.carRepository.create(carExists);
  }
}

export { CreateCarSpecificationUseCase };
