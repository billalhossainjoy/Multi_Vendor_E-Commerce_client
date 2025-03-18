import React from 'react';
import emtyProfile from "/emptyProfile.svg"
import {FieldValues, UseFormReturn, Path, PathValue} from "react-hook-form";

interface Props<T extends FieldValues> {
    name: Path<T>;
    form: UseFormReturn<T>
}

const ProfileUploader = <T extends FieldValues>({ form, name}: Props<T>) => {
    const avatar = form.watch(name);

    const handler = (e:  React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        form.setValue(name, file as PathValue<T, Path<T>>);
    }

    const error =  form.formState.errors[name]

    return (
        <div className={"flex flex-col items-center gap-4"}>
            <label htmlFor={"profile-pic"}>
                <div className={`h-40 w-40 rounded-full overflow-hidden shadow-2xl ${error && "border-2 border-red-500"}`}>
                    {avatar ?
                        <img src={URL.createObjectURL(avatar)} alt={"profile"}/>
                        : <img src={emtyProfile} alt={"profile"}/>
                    }
                </div>
                <input id={"profile-pic"} type="file" className={"hidden"} onChange={handler}/>
            </label>
            <p className={"text-red-500 text-sm"}>
                {error && typeof error.message == "string" && error.message}
            </p>
        </div>
    );
};

export default ProfileUploader