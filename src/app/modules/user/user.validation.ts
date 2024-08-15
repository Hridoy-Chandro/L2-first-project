import { z } from 'zod';



const userValidationSchema = z.object({
  password: z
    .string({
        invalid_type_error: 'password must be string'
    })
    .max(16, { message: 'password can not be 16 characters' }),
});


export const userValidation = {
  userValidationSchema
};
