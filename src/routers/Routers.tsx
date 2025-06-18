import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/dashboard/Home";
import Auth from "../pages/auth/Auth/Auth";
import Login from "../pages/auth/Login";
import Items from "../pages/dashboard/Items";
import ItemsIndex from "../pages/dashboard/ItemsIndex/ItemsIndex";
import AddItem from "../pages/dashboard/AddItem/AddItem";
import SignUp from "../pages/auth/SignUp";
import Error from "../pages/Error/Error";
import EditItem from "../pages/dashboard/EditItem/EditItem";
import ShowItem from "../pages/dashboard/ShowItem/ShowItem";

export const routers = createBrowserRouter(
  [
    {
      path: "/",
      element: <Auth />,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/home",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: "items",
          element: <Items />,
          children: [
            {
              path: "",
              element: <ItemsIndex />,
            },
            {
              path: "add",
              element: <AddItem />,
            },
            {
              path: "edit/:id",
              element: <EditItem />,
            },
            {
              path: "show/:id",
              element: <ShowItem />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/Task5",
  }
);
