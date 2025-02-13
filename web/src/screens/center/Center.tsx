import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";

import CenterPage from "../../components/center/CenterPage";

import { ADMIN_ROLES } from "../../enum/admin.enum";
import ROUTES from "../../enum/routes.enum";

const Center: React.FC = () => {
  const { role } = useAppSelector((state) => state.userData.userData);
  if (role === ADMIN_ROLES.CENTRE_MANAGER) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }
  return <CenterPage />;
};

export default Center;
