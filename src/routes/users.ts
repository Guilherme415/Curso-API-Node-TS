import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import uploadConfig from '@config/upload';
import UserController from "@modules/controllers/UserController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UserController();

const upload = multer(uploadConfig);

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

usersRouter.patch(
    '/updateAvatar',
    isAuthenticated,
    upload.single('avatar'),
    usersController.UpdateUserAvatar
);

export default usersRouter;
