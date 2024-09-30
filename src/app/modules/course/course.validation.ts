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
    credits: z.number(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCorsesValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updatedCourseValidationSchema = createCourseValidationSchema.partial();

const FacultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updatedCourseValidationSchema,
  FacultiesWithCourseValidationSchema,
};
