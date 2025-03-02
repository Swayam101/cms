import { Flex } from "@mantine/core";
import React, { useState } from "react";
import FTypography from "../../ui/typography/FTypography";
import MyCustomerTable from "../../components/user/UserCustomerTable/MyCustomerTable";
import { useAppSelector } from "../../app/hooks";

interface IProps {}

const FreeTrialCustomers: React.FC<IProps> = () => {
  const currentUserId = useAppSelector((state) => state.userData.userData._id);
  const [page, setPage] = useState(1);

  return (
    <Flex direction={"column"} gap={24}>
      <FTypography
        fontSize={"24px"}
        text="Free Trial Customers"
        variant={"oswald500"}
      />
      <MyCustomerTable
        id={`${currentUserId}`}
        setPage={setPage}
        page={page}
        isFreeTrial
      />
    </Flex>
  );
};

export default FreeTrialCustomers;
