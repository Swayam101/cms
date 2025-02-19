import { createBrowserRouter } from "react-router-dom";
import ROUTES from "../enum/routes.enum";
import ProtectedRoute from "../router/Protected.route";
import Login from "../screens/auth/Login";
import Dashboard from "../screens/dashboard-screen/Dashboard";
import Admin from "../screens/admin/Admin";
import User from "../screens/user/User";
import Center from "../screens/center/Center";
import Customers from "../screens/customer/Customer";
import BookingCalender from "../screens/booking/BookingCalender";
import ListBookingPage from "../screens/list-booking/ListBooking";
import CentrePricingUpdate from "../screens/centre-pricing-update/CentrePricingUpdate";
import EditBlockedSlots from "../screens/edit-blocked/EditBlockedSlots";
import Report from "../screens/report/Report";
import BulkBookingPage from "../screens/bulk-booking/BulkBookingPage";
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
        path: ROUTES.ADMIN_TABLE_PAGE,
        element: <Admin />,
      },
      {
        path: ROUTES.USER_TABLE_PAGE,
        element: <User />,
      },
      {
        path: ROUTES.BULK_BOOKING,
        element: <BulkBookingPage />,
      },
      {
        path: ROUTES.CENTER_TABLE_PAGE,
        element: <Center />,
      },
      {
        path: ROUTES.REPORT_PAGE,
        element: <Report />,
      },
      {
        path: ROUTES.USER_DETAILS,
        element: <UserDetails />,
      },
      {
        path: ROUTES.CUSTOMER_TABLE_PAGE,
        element: <Customers />,
      },
      {
        path: ROUTES.CALENDER,
        element: <BookingCalender />,
      },
      {
        path: ROUTES.LIST_BOOKING,
        element: <ListBookingPage />,
      },
      {
        path: ROUTES.UPDATE_CENTER_PRICING,
        element: <CentrePricingUpdate />,
      },
      {
        path: ROUTES.EDIT_BLOCKED,
        element: <EditBlockedSlots />,
      },
    ],
  },
]);
