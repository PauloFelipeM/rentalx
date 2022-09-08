import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car>;

  findAvailable(column?: string, value?: string): Promise<Car[]>;

  findById(id: string): Promise<Car>;
}

export { ICarRepository };
