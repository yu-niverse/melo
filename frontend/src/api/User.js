import { API } from "./index";
import axios from "axios";

export const UserSignup = async (user) => {
  const response = await axios({
    method: "POST",
    url: API.signup,
    data: user,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const UserLogin = async (user) => {
  const response = await axios({
    method: "POST",
    url: API.login,
    data: user,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const GetUserInfo = async () => {
  const response = await axios({
    method: "GET",
    url: API.userinfo,
    headers: { "Content-Type": "application/json" },
  });
  return response.data.data;
}
