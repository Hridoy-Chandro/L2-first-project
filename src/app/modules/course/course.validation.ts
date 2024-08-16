
import { z } from 'zod';

const updatePreRequisiteCorsesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credit: z.number(),
    preRequisiteCourses: z.array(updatePreRequisiteCorsesValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});


const updatedCourseValidationSchema = createCourseValidationSchema.partial();



export const CourseValidation = {
  createCourseValidationSchema,
  updatedCourseValidationSchema
};
