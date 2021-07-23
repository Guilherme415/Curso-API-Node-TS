import { Router } from 'express';
import productsRouter from '../../../../src/routes/products'
import usersRouter from '../../../../src/routes/users'


const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);


export default routes;
