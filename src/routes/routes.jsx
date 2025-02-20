import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import AddTask from "../pages/AddTask";
import MyTasks from "../pages/MyTasks";
import EditTask from "../pages/EditTask";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/myTasks",
        element: (
          <PrivateRoute>
            <MyTasks></MyTasks>
          </PrivateRoute>
        ),
      },
      {
        path: "/addTask",
        element: (
          <PrivateRoute>
            <AddTask></AddTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/editTask/:id",
        element: (
          <PrivateRoute>
            <EditTask></EditTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
