import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPasswordController from "@modules/controllers/ForgotPasswordController";
import ResetPasswordController from "@modules/controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required()
        },
    }),
    forgotPasswordController.Post
);

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_Confirmation: Joi.string().required().valid(Joi.ref('password')),
        },
    }),
    resetPasswordController.Post
);



export default passwordRouter;
