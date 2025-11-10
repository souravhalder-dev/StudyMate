import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import FindPartners from "../Pages/FindPartners";
import Profile from "../Profile/Profile";
import CreatePartner from "../Pages/CreatePartner";
import MyConnections from "../Pages/MyConnections";
import PrivateRouter from "../PrivateRouter/PrivateRouter";

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
        path: "create-partner-profile",
        element: (
          <PrivateRouter>
            <CreatePartner></CreatePartner>
          </PrivateRouter>
        ),
      },
      {
        path: "myconnections",
        element: (
          <PrivateRouter>
            <MyConnections></MyConnections>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
