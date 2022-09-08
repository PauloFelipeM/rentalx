import { parse as csvParse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoryRepository';

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<ICreateCategoryDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: ICreateCategoryDTO[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category: ICreateCategoryDTO) => {
      const existsCategory = await this.categoryRepository.findByName(
        category.name
      );
      if (!existsCategory) {
        await this.categoryRepository.create(category);
      }
    });
  }
}

export { ImportCategoryUseCase };
