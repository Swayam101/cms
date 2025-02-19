import { Box, Center, Flex, Loader } from "@mantine/core";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useGetCustomerById from "../../hooks/customer/useGetCustomerById";
import { ICustomerData } from "../../types";
import DefaultTable from "../../components/Dynamic-Table/table/DefaultTable";
import CustomerStatusTable from "../../constants/CustomerStatusTable";
import UserDetailsCard from "../../components/user/UserDetailCard/UserDetailCard";
import FTypography from "../../ui/typography/FTypography";

const CustomerDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userId = `${searchParams.get("id")}`;
  const { data, isLoading } = useGetCustomerById(userId);

  const customer: ICustomerData = useMemo(() => {
    if (!isLoading && data?.data) {
      return data.data.customer;
    }
    return {
      name: "",
      phone: "",
      statusHistory: [],
    } as Pick<ICustomerData, "name" | "phone" | "statusHistory">;
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <Flex direction={"column"}>
      <Box>
        <UserDetailsCard
          email="N/A"
          image=""
          name={customer.name}
          phone={customer.phone}
        />
      </Box>
      <FTypography
        fontSize={24}
        text={`Current Handler : ${
          (typeof customer.assignedTo === "string"
            ? customer.assignedTo
            : customer.assignedTo?.username) ?? "N/A"
        }`}
        variant={"nunito700"}
      />
      <Box>
        <DefaultTable
          columns={CustomerStatusTable as TTableColumns<unknown>[]}
          data={customer.statusHistory}
          isLoading={isLoading}
        />
      </Box>
    </Flex>
  );
};

export default CustomerDetails;
