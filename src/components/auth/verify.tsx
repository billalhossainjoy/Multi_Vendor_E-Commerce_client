import Button from "../common/button.tsx";
import {useAppDispatch} from "../../app/store.ts";
import {userVerification} from "../../app/features/auth/auth.slice.ts";
import {useNavigate, useParams} from "react-router-dom";

const Verify: React.FC = () => {
    const navigate = useNavigate();
    const { token } = useParams()
    const dispatch = useAppDispatch()

    const submitHandler = () => {
        if(token) dispatch(userVerification(token)).then(res => res.payload.success && navigate("/store"))
        else alert("Verification failed")
    }

    return (
        <div className=" flex items-center justify-center w-full p-40 flex-col gap-2">
            <p className="font-medium text-sm text-gray-700">Please click to verify your account </p>
            <div className="">
                <Button onClick={submitHandler}>Verify account</Button>
            </div>
        </div>
    );
}

export default Verify