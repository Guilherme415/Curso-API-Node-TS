import { Router } from 'express';
import productsRouter from '../../../../src/routes/products'

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
