
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payLoad: TAcademicDepartment) => {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: payLoad.name,
  });
  // if (isDepartmentExist) {
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     'This department is already exist!',
  //   );
  // }

  const result = await AcademicDepartment.create(payLoad);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (_id: string) => {
  const result = await AcademicDepartment.findById({ _id }).populate(
    'academicFaculty',
  );
  return result;
};

const updateSingleAcademicDepartmentIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payLoad,
    {
      new: true,
    },
  );

  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB: createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentIntoDB,
};
