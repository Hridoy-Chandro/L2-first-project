import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OfferedCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {

    const result  = await OfferedCourseServices.createOfferedCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered course is created successfully',
        data: result
    })
})



export const OfferedCourseControllers = {
    createOfferedCourse
}