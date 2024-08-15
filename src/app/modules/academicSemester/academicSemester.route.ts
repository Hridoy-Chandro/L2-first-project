import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// will call controller func

// router.get('/', StudentControllers.getAllStudents);

// router.get('/:studentId', StudentControllers.getSingleStudent);

// router.delete('/:studentId', StudentControllers.deleteStudent);

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester);


router.patch('/:semesterId', validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidationSchema), AcademicSemesterControllers.updateAcademicSemester);


router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

export const AcademicSemesterRoutes = router;
