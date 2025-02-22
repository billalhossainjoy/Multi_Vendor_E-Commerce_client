import { z } from 'zod';

export const SignUpSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    termsPolicy: z.boolean().refine(value => value, {message: "Accept terms and policy"})
})

export const LoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    termsPolicy: z.boolean().refine(value => value, {message: "Accept terms and policy"})
})

export type TypeSignupSchema = z.infer<typeof SignUpSchema>
export type TypeLoginSchema = z.infer<typeof LoginSchema>