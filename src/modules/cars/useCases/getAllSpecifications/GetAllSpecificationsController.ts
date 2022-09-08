import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllSpecificationUseCase } from './GetAllSpecificationUseCase';

class GetAllSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllSpecificationUseCase = container.resolve(
      GetAllSpecificationUseCase
    );
    const specifications = await getAllSpecificationUseCase.execute();

    return response.json(specifications);
  }
}

export { GetAllSpecificationsController };
