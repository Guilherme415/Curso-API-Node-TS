import { Router} from "express";
import ProductsController from "@modules/controllers/ProductsController";
import {celebrate, Joi, Segments} from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();


productsRouter.get('/', productsController.index);

productsRouter.get('/getById/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.GetById);

productsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
    }),
    productsController.Post
);

productsRouter.put('/update/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.Put
);


productsRouter.delete('/delete/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.Delete
);

export default productsRouter;
