import React, { useMemo, useState } from "react";
import DefaultTable from "../../Dynamic-Table/table/DefaultTable";
import { IServerResponse } from "../../../interfaces/serverResponse.interface";
import { courtTable } from "../../../constants/CustomerTable";
import { Box, Flex, Select } from "@mantine/core";
import { useGetMyCustomers } from "../../../hooks/users/useGetMyCustomers";
import FInput from "../../../ui/input/finput/FInput";
import { useForm } from "@mantine/form";
import CustomerStatuses from "../../../constants/CustomerStatuses";

interface IProps {
  id: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isFreeTrial?: boolean;
  page?: number;
}

const MyCustomerTable: React.FC<IProps> = ({
  id,
  setPage,
  isFreeTrial,
  page,
}) => {
  const form = useForm({
    initialValues: {
      search: "",
      statusFilter: "",
    },
  });

  const [statusFilter, setStatusFilter] = useState<undefined | string>(
    undefined
  );

  const { data, isLoading } = useGetMyCustomers({
    id,
    search: `${form.getValues().search}`,
    statusFilter,
    freeTrial: !!isFreeTrial,
    limit: 25,
    page,
  });

  const { pagination, results } = useMemo(() => {
    if (!isLoading && data?.data) {
      const cd = data.data.customers;
      const { results, ...pagination } = cd;
      return { results, pagination };
    }
    return {
      results: [],
      pagination: {
        currentPage: 1,
        totalDocuments: 0,
        totalPages: 1,
        total: 0,
      } as IServerResponse["pageData"],
    };
  }, [data, isLoading]);
  return (
    <Flex gap={16} direction={"column"}>
      <Flex align={"center"} gap={24}>
        <Box>
          <FInput
            label="Search"
            variant="text"
            formHandler={form.getInputProps("search")}
          />
        </Box>
        {!isFreeTrial && (
          <Box>
            <Select
              label="Status Filter"
              data={CustomerStatuses}
              onChange={(value) => setStatusFilter(value ?? undefined)}
            />
          </Box>
        )}
      </Flex>
      <DefaultTable
        columns={
          courtTable(true, isFreeTrial, true) as TTableColumns<unknown>[]
        }
        data={results}
        isLoading={isLoading}
        paginationProps={{
          setPage,
          ...pagination,
        }}
      />
    </Flex>
  );
};

export default MyCustomerTable;
