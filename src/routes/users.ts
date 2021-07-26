import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UserController from "@modules/controllers/UserController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UserController();

usersRouter.get('/', isAuthenticated, usersController.GetAll);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        },
    }),
    usersController.Post
);

export default usersRouter;
