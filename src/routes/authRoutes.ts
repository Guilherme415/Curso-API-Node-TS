import AuthController from "@modules/controllers/AuthController";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";


const authRouter = Router();
const controller = new AuthController();

authRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    controller.Post
)

export default authRouter;
