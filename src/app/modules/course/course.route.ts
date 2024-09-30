import express from 'express';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../Auth/auth';

const router = express.Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', auth('student', 'faculty', 'admin'), CourseControllers.getSingleCourse);


router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidation.updatedCourseValidationSchema),
  CourseControllers.updateCourse,
);


router.delete('/:id', auth('admin'), CourseControllers.deleteCourse);

router.put('/:courseId/assign-faculties', 
  validateRequest(CourseValidation.FacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse)


router.delete('/:courseId/remove-faculties', 
  validateRequest(CourseValidation.FacultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesWithCourse)



router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
