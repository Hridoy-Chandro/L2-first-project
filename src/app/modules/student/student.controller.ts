/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';



const getSingleStudent = catchAsync(async (req, res) => {

    const { id } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Students is retrieved successfully',
      data: result,
    });
 
});


const getAllStudents = catchAsync (async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is retrieved successfully',
    data: result,
  });

});




const updatedStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {student} = req.body;

  const result = await StudentServices.updateStudentIntoDB(id, student);

 sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students is updated successfully',
    data: result,
  });

});


const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentServices.deleteStudentFromDB(id);

 sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students is deleted successfully',
    data: result,
  });

});


export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updatedStudent
};
