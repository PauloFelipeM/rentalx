import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';

class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate });
  }

  async findAvailable(column?: string, value?: string): Promise<Car[]> {
    return await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true })
      .where(`${column} :columnValue`, { columnValue: value })
      .getMany();
  }

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne({ id });
  }
}

export { CarRepository };
