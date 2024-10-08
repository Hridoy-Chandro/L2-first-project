import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../Auth/auth';

const router = express.Router();

// will call controller func

router.get('/:id', 
    auth('admin', 'faculty'),
    StudentControllers.getSingleStudent);

router.delete('/:id', StudentControllers.deleteStudent);

router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updatedStudent,
);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
