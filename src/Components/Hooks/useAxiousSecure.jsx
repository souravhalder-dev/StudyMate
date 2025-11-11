import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiousSecure = () => {
  const { user, singOut } = useAuth();
  const nevigate = useNavigate();
  // set token
  useEffect(() => {
    const requestInterCeptor = instance.interceptors.request.use((config) => {
    //   const token = user.accessToken;
    //   if (token) {
    //     config.headers.authorization = ` Bearer ${user.accessToken} `;
    //   }
      return config;
    });
    // Add a response interceptor
    const responseinterCeptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
        const status = err.status;
        if (status === 401 || status === 403) {
          singOut().then(() => {
            // negitave the login page
            nevigate("/register");
          });
        }
      }
    );
    return () => {
      instance.interceptors.request.eject(requestInterCeptor);
      instance.interceptors.request.eject(responseinterCeptor);
    };
  }, [user, singOut, nevigate]);
  return instance;
};
export default useAxiousSecure;
