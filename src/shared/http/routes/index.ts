import { Router } from 'express';
import authRouter from 'src/routes/authRoutes';
import passwordRouter from 'src/routes/password.routes';
import productsRouter from '../../../../src/routes/products'
import usersRouter from '../../../../src/routes/users'

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter)


export default routes;
