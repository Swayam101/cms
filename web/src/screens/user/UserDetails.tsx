import { Box, Flex } from "@mantine/core";
import React, { useMemo, useState } from "react";
import FTypography from "../../ui/typography/FTypography";
import UserDetailsCard from "../../components/user/UserDetailCard/UserDetailCard";
import { useSearchParams } from "react-router-dom";
import useGetUserById from "../../hooks/centre/useGetUserById";
import UserCustomerTable from "../../components/user/UserCustomerTable/UserCustomerTable";
import FButton from "../../ui/button/FButton";
import { Modals } from "../../container/modals/Fmodals";
import AssignCustomersModal from "../../container/modals/AssignCustomersModal/AssignCustomersModal";
import { useAppSelector } from "../../app/hooks";
import MyCustomerTable from "../../components/user/UserCustomerTable/MyCustomerTable";

const UserDetails: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(1);

  const role = localStorage.getItem("role");
  const isUser = role === "user";
  const currentUserId = useAppSelector((state) => state.userData.userData._id);

  const userId = `${searchParams.get("id")}`;
  const actualId = isUser ? currentUserId : userId;

  const { data: userData, isLoading: userDataLoading } = useGetUserById(
    `${actualId}`
  );

  const user = useMemo(() => {
    if (!userDataLoading && userData?.data) {
      return {
        ...userData.data.user,
      };
    }
    return {
      username: "N/A",
    };
  }, [userData, userDataLoading]);

  return (
    <Flex direction={"column"} gap={24}>
      {!isUser && (
        <FTypography
          variant={"nunito400"}
          fontSize={"28px"}
          text="User Details"
        />
      )}

      <Flex align={"flex-end"} gap={36}>
        {!isUser && (
          <UserDetailsCard
            email="N/A"
            image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
            name={user.username}
            phone="N/A"
          />
        )}
        {!isUser && (
          <Box>
            <FButton
              onClick={() => {
                Modals({
                  children: <AssignCustomersModal id={userId} />,
                  title: "Assign Customers",
                  size: "sm",
                });
              }}
              label="Assign Customers"
              variant={"outline"}
            />
          </Box>
        )}
      </Flex>
      {isUser ? (
        <MyCustomerTable id={`${actualId}`} setPage={setPage} page={page} />
      ) : (
        <UserCustomerTable page={page} id={`${actualId}`} setPage={setPage} />
      )}
    </Flex>
  );
};

export default UserDetails;
