import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase';

let carRepositoryInMemory: CarRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'teste1',
      description: 'teste1',
      daily_rate: 100,
      license_plate: 'ABCA',
      fine_amount: 10,
      brand: 'BRAND',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'teste1',
      description: 'teste1',
      daily_rate: 100,
      license_plate: 'ABCA',
      fine_amount: 10,
      brand: 'BRAND_TEST',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      column: 'brand',
      value: car.brand,
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'teste55',
      description: 'teste1',
      daily_rate: 100,
      license_plate: 'ABCA',
      fine_amount: 10,
      brand: 'BRAND_TEST',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      column: 'name',
      value: car.name,
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by categoryId', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'teste4',
      description: 'teste1',
      daily_rate: 100,
      license_plate: 'ABCA',
      fine_amount: 10,
      brand: 'BRAND_TEST',
      category_id: '12345',
    });

    const cars = await listCarsUseCase.execute({
      column: 'category_id',
      value: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});
