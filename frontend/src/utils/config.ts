import axios from "axios";
// import store from "../store/store";
// import { userActions } from "../store/authSlice";

const serverUrl = "http://localhost:3300/api";

export const axiosInstance = axios.create({
  baseURL: serverUrl,
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  }
  //   async function (err) {
  //     const state = store.getState();
  //     const refreshtoken = state.user.user?.refreshToken;
  //     const originalReq = err?.config;
  //     if (err?.response?.status === 403 && !originalReq?._retry) {
  //       originalReq._retry = true;
  //       const result = await axiosInstance
  //         .get(config.authURL.refreshToken, {
  //           headers: {
  //             authorization: `Bearer ${refreshtoken}`,
  //           },
  //         })
  //         .catch((err) => {
  //           console.log("error from getting refresh token: ", err);
  //           return Promise.reject(err);
  //         });
  //       const newToken = result.headers.authorization;
  //       originalReq.headers["authorization"] = `Bearer ${newToken}`;
  //       store.dispatch(userActions.setNewToken(newToken));
  //       return axiosInstance(originalReq);
  //     }
  //     return Promise.reject(err);
  //   }
);
