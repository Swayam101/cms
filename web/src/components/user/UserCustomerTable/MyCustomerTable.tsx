import React, { useMemo } from "react";
import DefaultTable from "../../Dynamic-Table/table/DefaultTable";
import { IServerResponse } from "../../../interfaces/serverResponse.interface";
import { courtTable } from "../../../constants/CustomerTable";
import { Box, Flex } from "@mantine/core";
import { useGetMyCustomers } from "../../../hooks/users/useGetMyCustomers";
import FInput from "../../../ui/input/finput/FInput";
import { useForm } from "@mantine/form";

interface IProps {
  id: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MyCustomerTable: React.FC<IProps> = ({ id, setPage }) => {
  const form = useForm({
    initialValues: {
      search: "",
      statusFilter: "",
    },
  });
  const { data, isLoading } = useGetMyCustomers({
    id,
    search: `${form.getValues().search}`,
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
      <Flex>
        <Box>
          <FInput
            label="Search"
            variant="text"
            formHandler={form.getInputProps("search")}
          />
        </Box>
      </Flex>
      <DefaultTable
        columns={courtTable(true) as TTableColumns<unknown>[]}
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
