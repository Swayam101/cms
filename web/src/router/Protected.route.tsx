import { memo } from "react";
import Layout from "../components/Layout/Layout";
import { useGetAdminData } from "../hooks/auth/useGetAdminAuth";
import { useAppDispatch } from "../app/hooks";
import { setAdminData } from "../app/reducers/user-data/adminData-reducer";

const ProtectedRoute = () => {
  const role = localStorage.getItem("role");

  const dispatch = useAppDispatch();

  const isUser = role === "user";
  const { isLoading, data } = useGetAdminData(isUser);

  if (!isLoading && data?.status === "success") {
    dispatch(setAdminData(data.data.user));
    return <Layout loading={false} />;
  } else return <Layout loading={isLoading} />;
};

export default memo(ProtectedRoute);
