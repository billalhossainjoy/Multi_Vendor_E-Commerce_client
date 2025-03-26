import { z } from 'zod';

export const FileValidate = (size : number) =>  z.custom<File>((file) =>  {
    if(!file) return false;
    else return file.size <= size * 1024 * 1024;
}, {message: `File size must be less than ${size}MB`}).nullable()

export const ForgottenSchema = z.object({
    email: z.string().email("Invalid email address."),
});

export const SignUpSchema = z.object({
    avatar: FileValidate(5),
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    termsPolicy: z.boolean().refine(value => value, {message: "Accept terms and policy"})
})

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters"),
    termsPolicy: z.boolean().refine(value => value, {message: "Accept terms and policy"})
})

export const ChangePasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: `Confirm password not matched`,
})

export type TSignupSchema = z.infer<typeof SignUpSchema>
export type TLoginSchema = z.infer<typeof LoginSchema>
export type TEmailSchema = z.infer<typeof ForgottenSchema>
export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>