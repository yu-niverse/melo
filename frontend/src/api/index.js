const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API = {
  signup: `${BASE_URL}/user/signup`,
  login: `${BASE_URL}/user/login`,
  userinfo: `${BASE_URL}/user/profile`,
  room: `${BASE_URL}/room`,
  playlist: `${BASE_URL}/list/room`,
};
