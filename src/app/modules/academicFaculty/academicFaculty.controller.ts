import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});


const getAllAcademicFaculties = catchAsync(async(req, res) => {
    const result = await AcademicFacultyService.getAllFacultiesFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculties are retrieved successfully',
        data: result,
    })
});

const getSingleAcademicFaculty = catchAsync(async(req, res) => {
    const {facultyId} = req.params;
    const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is retrieved successfully',
        data: result,
    })
});


const updateAcademicFaculty = catchAsync(async(req, res) =>{
    const {facultyId} = req.params;
    const result = await AcademicFacultyService.updateSingleAcademicFacultyIntoDB(
        facultyId,
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is updated successfully',
        data: result,
    })

});

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}