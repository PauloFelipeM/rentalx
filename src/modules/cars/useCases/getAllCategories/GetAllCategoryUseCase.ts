import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';

@injectable()
class GetAllCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }
}

export { GetAllCategoryUseCase };
