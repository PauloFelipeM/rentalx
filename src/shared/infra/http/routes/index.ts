import { Router } from 'express';

import { authRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();
router.use(authRoutes);

router.use('/cars', carsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);

export { router };
