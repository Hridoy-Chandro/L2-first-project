import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './AcademicDepartment.validation';
import { AcademicDepartmentControllers } from './AcademicDepartment.controller';


const router = express.Router();

 router.post('/create-academic-department', 
    // validateRequest(
//     AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
// ),
AcademicDepartmentControllers.createAcademicDepartment,
);


router.get('/:departmentId', AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch('/:departmentId', validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
),
AcademicDepartmentControllers.updateAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);


export const AcademicDepartmentRoutes = router;