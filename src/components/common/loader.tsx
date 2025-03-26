import {LuLoader} from "react-icons/lu";


export function Loader() {
    return (
        <div className={"h-screen w-full flex justify-center items-center"}>
            <LuLoader className={"animate-spin"} size={25} />
        </div>
    );
};