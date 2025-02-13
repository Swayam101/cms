import React from "react";
import { useAppSelector } from "../../app/hooks";
import { ADMIN_ROLES } from "../../enum/admin.enum";
import { Navigate } from "react-router-dom";
import ROUTES from "../../enum/routes.enum";
import ReportPage from "../../components/report/ReportPage";

const Report: React.FC = () => {
  const { role } = useAppSelector((state) => state.userData.userData);
  if (role === ADMIN_ROLES.CENTRE_MANAGER) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }
  return <ReportPage />;
};

export default Report;
