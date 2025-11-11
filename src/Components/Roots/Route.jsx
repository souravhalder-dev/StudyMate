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
        loader: ({ params }) =>
          fetch(`http://localhost:3000/user/${params.id}`),
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
            <Connections></Connections>
          </PrivateRouter>
        ),
      },

      {
        path: "partner/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/user/${params.id}`),
        Component: PartnerDetails,
      },
    ],
  },
]);
