import { Router } from 'express';
import authRouter from 'src/routes/authRoutes';
import productsRouter from '../../../../src/routes/products'
import usersRouter from '../../../../src/routes/users'


const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRouter);


export default routes;
