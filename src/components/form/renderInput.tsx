import {FormFieldProps} from "./formInput.tsx";
import {FieldValues} from "react-hook-form";
import {FormFieldType} from "./constaints.ts";
import {useState} from "react";
import {LuEye, LuEyeOff} from "react-icons/lu";

interface Props<T extends FieldValues> {
    props: FormFieldProps<T>
}

const RenderInput = <T extends FieldValues>({props}: Props<T>) => {
    const [viewPassword, setViewPassword] = useState(false)

    const {name, form, placeholder} = props;

    switch (props.FieldType) {
        case FormFieldType.INPUT:
            return <div className={"space-y-1"}>
                <input
                    type={"text"}
                    placeholder={placeholder}
                    {...form.register(name)}
                    className={"input"}
                />
            </div>
        case FormFieldType.PASSWORD:
            return <div className={"space-y-1"}>
                <div  className={"input flex items-center"}>
                    <input
                        type={viewPassword ? "text" : "password"}
                        placeholder={placeholder}
                        {...form.register(name)}
                        className={"w-full"}
                    />
                    <div onClick={() => setViewPassword(!viewPassword)} className={"cursor-pointer ml-2"} style={{fontSize: "1.2rem"}}>
                        {
                            !viewPassword ? <LuEye /> : <LuEyeOff   />
                        }
                    </div>
                </div>
            </div>
        case FormFieldType.NUMBER:
            return <div className={"space-y-1"}>
                <input
                    type={"number"}
                    placeholder={placeholder}
                    {...form.register(name)}
                    className={"input"}
                />
            </div>
        case FormFieldType.CHECKBOX:
            return <label id={name} className={"space-y-1 flex items-center p-2 select-none"}>
                <input
                    id={name}
                    type={"checkbox"}
                    {...form.register(name)}
                    className={"m-0"}
                />
                <p id={name} className={"ml-2 text-gray-700 font-medium"}>
                    {props.label}
                </p>
            </label>

    }
};

export default RenderInput;
