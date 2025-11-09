import { useContext } from "react";
import { AuthContex } from "../AuthContex/AuthContex";

const useAuth = () => {
  return useContext(AuthContex);
};

export default useAuth;
