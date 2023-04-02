import axios from "axios";

export const client = axios.create({
  baseURL: process.env.BACKEND_ACCESS,
});

export const loginCall = async (user, dispatch) => {
  const client = axios.create({
    baseURL: process.env.BACKEND_ACCESS,
  });

  dispatch({ type: "LOGIN_START" });
  try {
    // userにはemailとpasswordが入る
    const response = await client("auth/login", user);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err });
  }
};
