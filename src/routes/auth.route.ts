import express from 'express';
import validate from '../middlewares/validate';
import Validations from '../validations/auth.validation'
import AuthController from '../controllers/auth.controller'

const router = express.Router();
const authController = new AuthController();
router.post(
  "/register",
  validate(Validations.createUser),
  authController.createUser
); 
export default router;
