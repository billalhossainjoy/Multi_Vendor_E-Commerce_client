import { FieldValues, Path, UseFormReturn} from "react-hook-form";
import {FormFieldType} from "./constaints.ts";
import RenderInput from "./renderInput.tsx";

export interface FormFieldProps<T extends FieldValues> {
    name: Path<T>;
    form: UseFormReturn<T>;
    placeholder?: string;
    FieldType: FormFieldType;
    label?: string;
};

const FormInput = <T extends FieldValues>(props: FormFieldProps<T>) => {
    const {name, label, FieldType, form} = props;

    const error = form.formState.errors[name]

    return (
        <div className="flex flex-col w-full">
            {label && FieldType !== FormFieldType.CHECKBOX &&
                <label className="block text-sm font-medium text-gray-500">
                    {label}
                </label>
            }

            <RenderInput props={props}/>

            {error && typeof error.message == "string" && <p className={"text-sm text-red-500"}>{error.message ? error.message : "Invalid"}</p>}

        </div>
    );
};

export default FormInput;
