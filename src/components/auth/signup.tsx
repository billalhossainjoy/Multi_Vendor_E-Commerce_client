import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "../form/formInput.tsx";
import {FormFieldType} from "../form/constaints.ts";
import {SignUpSchema, TypeSignupSchema} from "../../schema/auth.schema.ts";
import Button from "../common/button.tsx";

const SignUp: React.FC = () => {

    const form = useForm<TypeSignupSchema>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: TypeSignupSchema) => {
        console.log(data)
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
                        <FormInput<TypeSignupSchema> form={form} FieldType={FormFieldType.INPUT} name="name" label="Name" placeholder={"John Doe"} />
                        <FormInput<TypeSignupSchema> FieldType={FormFieldType.INPUT} name="email" label="Email"
                                                    form={form} placeholder="example@gmail.com"/>
                        <FormInput<TypeSignupSchema> FieldType={FormFieldType.PASSWORD} name="password" label="Password"
                                                    form={form} placeholder="********"/>
                        <FormInput name={"termsPolicy"} FieldType={FormFieldType.CHECKBOX} form={form}
                                   label={"I agree to the terms and policy"}/>
                        <div className={"space-y-2"}>
                            <Button>
                                Sign up
                            </Button>
                            <p className={"w-full flex justify-center"}>Already and account?
                                <span className={"text-indigo-600"}>Login</span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
