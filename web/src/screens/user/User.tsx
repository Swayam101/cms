import React from "react";
import UserPage from "../../components/user/UserPage";
import { useAppSelector } from "../../app/hooks";
import { ADMIN_ROLES } from "../../enum/admin.enum";
import ROUTES from "../../enum/routes.enum";
import { Navigate } from "react-router-dom";

const User: React.FC = () => {
  const { role } = useAppSelector((state) => state.userData.userData);
  if (role === ADMIN_ROLES.CENTRE_MANAGER) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }
  return <UserPage />;
};

export default User;
