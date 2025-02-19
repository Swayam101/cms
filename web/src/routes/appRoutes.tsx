import { createBrowserRouter } from "react-router-dom";
import ROUTES from "../enum/routes.enum";
import ProtectedRoute from "../router/Protected.route";
import Login from "../screens/auth/Login";
import Dashboard from "../screens/dashboard-screen/Dashboard";
import UploadLogs from "../screens/upload-logs/UploadLogs";
import User from "../screens/user/User";
import Customers from "../screens/customer/Customer";
import UserDetails from "../screens/user/UserDetails";
import CustomerDetails from "../screens/customer/CustomerDetails";

export const appRouter = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  { path: ROUTES.USER_LOGIN, element: <Login isUserForm /> },
  {
    path: ROUTES.DASHBOARD,
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.CUSTOMER_DETAILS,
        element: <CustomerDetails />,
      },
      {
        path: ROUTES.USER_CUSTOMER_PAGE,
        element: <UserDetails />,
      },
      {
        path: ROUTES.UPLOAD_LOGS_PAGE,
        element: <UploadLogs />,
      },
      {
        path: ROUTES.USER_TABLE_PAGE,
        element: <User />,
      },
      {
        path: ROUTES.USER_DETAILS,
        element: <UserDetails />,
      },
      {
        path: ROUTES.CUSTOMER_TABLE_PAGE,
        element: <Customers />,
      },
    ],
  },
]);
