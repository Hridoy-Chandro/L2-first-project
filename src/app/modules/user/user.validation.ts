import { z } from 'zod';
import { UserStatus } from './user.constant';



const userValidationSchema = z.object({
  password: z
    .string({
        invalid_type_error: 'password must be string'
    })
    .max(16, { message: 'password can not be 16 characters' }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});


export const userValidation = {
  userValidationSchema,
  changeStatusValidationSchema
};
