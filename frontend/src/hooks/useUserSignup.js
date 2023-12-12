import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { UserSignup } from "../api/User";

export const useUserSignup = () => {
    const navigate = useNavigate();

    return useMutation(UserSignup, {
        onSuccess: (data) => {
            // TODO: Handle success
            console.log(data.data);
            alert("Signup success!");
            navigate("/login");
        },
        onError: (error) => {
            // TODO: Handle error
            console.log(error);
            alert(error.response.data);
        },
    });
};
