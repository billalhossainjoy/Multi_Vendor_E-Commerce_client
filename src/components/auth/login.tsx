import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "../form/formInput.tsx";
import {FormFieldType} from "../form/constaints.ts";
import {LoginSchema, TypeLoginSchema} from "../../schema/auth.schema.ts";
import Button from "../common/button.tsx";

const Login: React.FC = () => {

    const form = useForm<TypeLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: TypeLoginSchema) => {
        console.log(data)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login to your account.
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormInput<TypeLoginSchema> FieldType={FormFieldType.INPUT} name="email" label="Email"
                                                    form={form} placeholder="example@gmail.com"/>
                        <FormInput<TypeLoginSchema> FieldType={FormFieldType.PASSWORD} name="password" label="Password"
                                                    form={form} placeholder="********"/>
                        <FormInput name={"termsPolicy"} FieldType={FormFieldType.CHECKBOX} form={form}
                                   label={"I agree to the terms and policy"}/>
                        <div className={"space-y-2"}>
                            <Button>
                                Login
                            </Button>
                            <p className={"w-full flex justify-center"}>Not have any account?
                                <span className={"text-indigo-600"}>Sign up</span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;
