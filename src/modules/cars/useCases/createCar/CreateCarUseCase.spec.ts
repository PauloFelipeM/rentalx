import { AppError } from '@errors/AppError';
import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car test',
      description: 'Car Description test',
      daily_rate: 100,
      license_plate: 'ABC',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with exist license plate', async () => {
    await expect(async () => {
      const category = {
        name: 'Car test',
        description: 'Car Description test',
        daily_rate: 100,
        license_plate: 'ABC',
        fine_amount: 60,
        brand: 'Car brand',
        category_id: 'category',
      };

      await createCarUseCase.execute(category);
      await createCarUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Car Description test',
      daily_rate: 100,
      license_plate: 'ABCD',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'category',
    });
    expect(car.available).toBe(true);
  });
});
