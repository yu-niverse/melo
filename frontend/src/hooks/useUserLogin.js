import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { UserLogin } from "../api/User";
import { useAuth } from "../provider/AuthProvider";

export const useUserLogin = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    return useMutation(UserLogin, {
        onSuccess: (data) => {
            console.log(data.data);
            alert("Login Success!");
            setToken(data.data.token);
            navigate(`/room/${data.data.default_room}`);
        },
        onError: (error) => {
            console.log(error);
            alert(error.response.data);
        },
    });
};
