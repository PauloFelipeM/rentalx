import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUserCase } from './AuthenticateUserUserCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUserCase = container.resolve(
      AuthenticateUserUserCase
    );

    return response.json(
      await authenticateUserUserCase.execute({ email, password })
    );
  }
}

export { AuthenticateUserController };
