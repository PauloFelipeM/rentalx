import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuth } from '@shared/infra/http/middlewares/ensureAuth';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post('/', ensureAuth, ensureAdmin, createCarController.handle);
carsRoutes.post(
  '/specifications/:id',
  ensureAuth,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carsRoutes };
