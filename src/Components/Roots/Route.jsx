import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import FindPartners from "../Pages/FindPartners";
import Profile from "../Profile/Profile";
import CreatePartner from "../Pages/CreatePartner";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import PartnerDetails from "../Pages/PartnerDetails";
import Connections from "../Pages/Connections";
import NotFound from "../Pages/NotFound";
import ForgetPassword from "../Pages/ForgetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "findpartners",
        element: <FindPartners />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "create-partner-profile",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/user/${params.id}`),
        element: (
          <PrivateRouter>
            <CreatePartner />
          </PrivateRouter>
        ),
      },
      {
        path: "myconnections",
        element: (
          <PrivateRouter>
            <Connections />
          </PrivateRouter>
        ),
      },
      {
        path: "partner/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/user/${params.id}`),
        element: (
          <PrivateRouter>
            <PartnerDetails />
          </PrivateRouter>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
