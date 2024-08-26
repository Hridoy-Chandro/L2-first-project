import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';

const createOfferedCourseIntoDB = async (payLoad: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
 
  } = payLoad;
  // check if the semester registration id is exists

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Faculty not found!',
    );
  }

  //check if the semester registration id is exists!
  
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic department not found!',
    );
  }


  
 //check if the semester registration id is exists!
 const isSemesterRegistrationExits =
 await SemesterRegistration.findById(semesterRegistration);

if (!isSemesterRegistrationExits) {
 throw new AppError(
   httpStatus.NOT_FOUND,
   'Semester registration not found !',
 );
}

const academicSemester = isSemesterRegistrationExits.academicSemester;


  const isCourseExits = await Course.findById(course);

  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found !');
  }

  const isFacultyExits = await Faculty.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }






  const result = await OfferedCourse.create({...payLoad, academicSemester});
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
