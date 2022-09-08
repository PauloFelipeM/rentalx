import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { column, value } = request.body;
    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    await listAvailableCarsUseCase.execute({ column, value });

    return response.status(201).send();
  }
}

export { ListAvailableCarsController };
