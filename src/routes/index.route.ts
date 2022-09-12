import express from 'express';
import validate from '../middlewares/validate';
import Validations from '../validations/index.validation'
import IndexController from '../controllers/index.controller'

const router = express.Router();

router.get(
  "/certificates",
  validate(Validations.getCertificates),
  new IndexController().getCertificates
); 
export default router;
