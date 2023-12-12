import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { UserLogin, UserSignup, GetUserInfo } from "../api/User";
import { useAuth } from "../provider/AuthProvider";

export const useUserSignup = () => {
  const navigate = useNavigate();

  return useMutation(UserSignup, {
    onSuccess: (data) => {
      console.log(data.data);
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
      alert(error.response.data);
    },
  });
};

export const useUserLogin = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  return useMutation(UserLogin, {
    onSuccess: (data) => {
      console.log(data.data);
      setToken(data.data.token);
      navigate(`/room/${data.data.default_room}`);
    },
    onError: (error) => {
      console.log(error);
      alert(error.response.data);
    },
  });
};

export const useGetUserInfo = () => {
  return useQuery("GetUserInfo", GetUserInfo);
};
