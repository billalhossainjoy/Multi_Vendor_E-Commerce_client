import React from "react";
import FormInput from "../form/formInput.tsx";
import {FormFieldType} from "../form/constaints.ts";
import Button from "../common/button.tsx";
import {LuLoader} from "react-icons/lu";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../app/store.ts";
import {ForgottenSchema, TEmailSchema} from "../../schema/auth.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {userForgottenPassword} from "../../app/features/auth/auth.slice.ts";
import {useNavigate} from "react-router-dom"


const Forgotten: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {isLoading} = useAppSelector(state => state.auth)
    const form = useForm<TEmailSchema>({
        resolver: zodResolver(ForgottenSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = ({email} : TEmailSchema) => {
        dispatch(userForgottenPassword(email))
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
                    <form className="space-y-6" onClick={form.handleSubmit(onSubmit)}>
                        <FormInput FieldType={FormFieldType.INPUT} name="email" label="Email"
                                                 form={form} placeholder="example@gmail.com"/>
                        <div className={"space-y-2"}>
                            <Button>
                                {
                                    isLoading ? <LuLoader className={"animate-spin"} size={20} /> : "Send mail"
                                }
                            </Button>
                            <p className={"w-full flex justify-center"}>Not have any account?
                                <span className={"text-indigo-600 cursor-pointer"} onClick={() => navigate("/auth/login")} >Log in</span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Forgotten