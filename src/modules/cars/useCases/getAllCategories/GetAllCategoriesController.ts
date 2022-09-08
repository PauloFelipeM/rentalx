import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllCategoryUseCase } from './GetAllCategoryUseCase';

class GetAllCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllCategoryUseCase = container.resolve(GetAllCategoryUseCase);
    const categories = await getAllCategoryUseCase.execute();

    return response.json(categories);
  }
}

export { GetAllCategoriesController };
