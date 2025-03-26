import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/store.ts";
import {useForm} from "react-hook-form";
import {ChangePasswordSchema, TChangePasswordSchema} from "../../schema/auth.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {userResetPassword} from "../../app/features/auth/auth.slice.ts";
import FormInput from "../form/formInput.tsx";
import {FormFieldType} from "../form/constaints.ts";
import Button from "../common/button.tsx";
import {LuLoader} from "react-icons/lu";
import {useParams} from "react-router-dom";

const ForgottenPassword: React.FC = () => {
    const {token} = useParams()
    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector(state => state.auth)
    const form = useForm<TChangePasswordSchema>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = ({password}: TChangePasswordSchema) => {
        if(!token) return alert("Session expired");
        dispatch(userResetPassword({password, token}))
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
                        <FormInput<TChangePasswordSchema> FieldType={FormFieldType.INPUT} name="password" label="Password"
                                                          form={form} placeholder="********"/>
                        <FormInput<TChangePasswordSchema> FieldType={FormFieldType.INPUT} name="confirmPassword" label="Confirm password."
                                                          form={form} placeholder="********"/>

                        <div className={"space-y-2"}>
                            <Button>
                                {
                                    isLoading ? <LuLoader className={"animate-spin"} size={20}/> : "Change Password"
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgottenPassword