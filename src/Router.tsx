import App from "@/App";
import CreateAccount from "@/pages/CreateAccount";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "login", element: <Login /> },
      { path: "create-account", element: <CreateAccount /> },
    ],
  },
]);

export default router;
