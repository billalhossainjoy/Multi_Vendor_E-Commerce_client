import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "../form/formInput.tsx";
import {FormFieldType} from "../form/constaints.ts";
import {SignUpSchema, TSignupSchema} from "../../schema/auth.schema.ts";
import Button from "../common/button.tsx";
import ProfileUploader from "./profileUploader.tsx";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store.ts";
import {signupUser} from "../../app/features/auth/auth.slice.ts";

const SignUp: React.FC = () => {
    const { isLoading } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    
    const navigate = useNavigate()

    const form = useForm<TSignupSchema>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            avatar: null,
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: TSignupSchema) => {
        const formData = new FormData();
        for (const key in data) {
            const element = data[key as keyof TSignupSchema];
            if(element !== null) {
                if(element instanceof File ) formData.append(key, element);
                if(typeof element === "string" || typeof element === "number" || typeof element === "boolean") formData.append(key, String(element));
            }
        }

        dispatch(signupUser(formData))
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Signup Your account.
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className={"flex justify-center"}>
                            <ProfileUploader<TSignupSchema> form={form} name={"avatar"}/>
                        </div>
                        <FormInput<TSignupSchema> form={form} FieldType={FormFieldType.INPUT} name="name" label="Name" placeholder={"John Doe"} />
                        <FormInput<TSignupSchema> FieldType={FormFieldType.INPUT} name="email" label="Email"
                                                    form={form} placeholder="example@gmail.com"/>
                        <FormInput<TSignupSchema> FieldType={FormFieldType.PASSWORD} name="password" label="Password"
                                                    form={form} placeholder="********"/>
                        <FormInput name={"termsPolicy"} FieldType={FormFieldType.CHECKBOX} form={form}
                                   label={"I agree to the terms and policy"}/>
                        <div className={"space-y-2"}>
                            <Button>
                                {isLoading ? "Loading..." :  "Sign up"}
                            </Button>
                            <p className={"w-full flex justify-center"}>Already and account?
                                <span className={"text-indigo-600 cursor-pointer"} onClick={() => navigate("/auth/login") }>Login</span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
