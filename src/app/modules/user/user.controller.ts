/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
// import { StudentValidationSchema } from "../student/student.validation";





const createStudent = catchAsync(async (req, res) => {

  const {password, student: studentData } = req.body;
  

  const result = await UserServices.createStudentIntoDB(password, studentData )
 
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is created successfully',
    data: result
  });

});
  

export const UserControllers = {
  createStudent
}
