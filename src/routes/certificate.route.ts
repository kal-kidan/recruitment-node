import express from 'express';
import validate from '../middlewares/validate';
import Validations from '../validations/certificate.validation'
import CertificateController from '../controllers/certificate.controller'

const router = express.Router();

router.get(
  "/available", 
  new CertificateController().getAvailableCertificate
); 
router.get(
  "/user", 
  new CertificateController().getMyCertificates
);
router.post(
  "/transfer", 
  validate(Validations.transferCertificate),
  new CertificateController().transferCertificate
);
export default router;
