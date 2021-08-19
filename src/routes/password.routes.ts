import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPasswordController from "@modules/controllers/ForgotPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required()
        },
    }),
    forgotPasswordController.Post
);


export default passwordRouter;
