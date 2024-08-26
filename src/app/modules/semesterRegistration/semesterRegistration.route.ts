import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);



router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);



router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);


router.patch('/:id', validateRequest(SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema),
SemesterRegistrationControllers.updateSemesterRegistration
)


export const semesterRegistrationRoutes = router;
