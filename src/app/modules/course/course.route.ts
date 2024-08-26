import express from 'express';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);


router.patch(
  '/:id',
  validateRequest(CourseValidation.updatedCourseValidationSchema),
  CourseControllers.updateCourse,
);


router.delete('/:id', CourseControllers.deleteCourse);

router.put('/:courseId/assign-faculties', 
  validateRequest(CourseValidation.FacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse)


router.delete('/:courseId/remove-faculties', 
  validateRequest(CourseValidation.FacultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesWithCourse)



router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
