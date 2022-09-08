import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { GetAllSpecificationsController } from '@modules/cars/useCases/getAllSpecifications/GetAllSpecificationsController';

import { ensureAuth } from '../middlewares/ensureAuth';

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const getAllSpecificationsController = new GetAllSpecificationsController();

specificationsRoutes.use(ensureAuth);

specificationsRoutes.post('/', createSpecificationController.handle);
specificationsRoutes.get('/', getAllSpecificationsController.handle);

export { specificationsRoutes };
