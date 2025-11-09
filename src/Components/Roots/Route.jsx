import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import FindPartners from "../Pages/FindPartners";
import Profile from "../Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layouts,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "findpartners",
        Component: FindPartners,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "loginorregister",
        Component: Register,
      },
    ],
  },
]);
