import { memo } from "react";
import Layout from "../components/Layout/Layout";
import { useGetAdminData } from "../hooks/auth/useGetAdminAuth";

const ProtectedRoute = () => {
  const { isLoading, data } = useGetAdminData();
  if (!isLoading && data?.status === "success")
    return <Layout loading={false} />;
  else return <Layout loading={isLoading} />;
};

export default memo(ProtectedRoute);
