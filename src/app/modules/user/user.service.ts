import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateFacultyId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  // create a user obj
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(payLoad.admissionSemester);
};



  const createFacultyIntoDB = async (password: string, payLoad: TFaculty) => {
    // create a user obj
    const userData: Partial<TUser> = {};
  
  
    // if password is not given, use default password
    userData.password = password || (config.default_password as string);
  
    // set student role
    userData.role = 'faculty';
  
    // find academic department info
    const academicDepartment = await AcademicDepartment.findById(
      payLoad.academicDepartment,

    );


    if(!academicDepartment){
      throw new AppError(httpStatus.BAD_REQUEST, 'Academic department is not found!');
    }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generated id
    userData.id = await generateFacultyId();

    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session }); // array

    // create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id , _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; // reference _id


    // create a faculty (transaction - 2)
    const newFaculty = await Faculty.create([payLoad], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;

  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(err);
  }
};



const createAdminIntoDB = async(password: string, payLoad: TFaculty) => {
  // create a user obj
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set admin role
  userData.role = 'admin';

  const session = await mongoose.startSession()

  try{

    session.startTransaction();

    // set generated id
    userData.id = await generateAdminId();

    // create a user
    const newUser = await User.create([userData], {session});

    // create a admin
    if(!newUser.length){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    // set id, _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; // reference id

    const newAdmin = await Admin.create([payLoad], {session});
  
    if(!newAdmin.length){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    session.commitTransaction();
    session.endSession();

    return newAdmin;

  }catch(err: any){
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
}





export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
};
