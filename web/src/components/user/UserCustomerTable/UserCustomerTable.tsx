import React, { useMemo } from "react";
import DefaultTable from "../../Dynamic-Table/table/DefaultTable";
import { useGetUserCustomers } from "../../../hooks/users/useGetUserCustomerCount";
import { IServerResponse } from "../../../interfaces/serverResponse.interface";
import { courtTable } from "../../../constants/CustomerTable";
import { Flex } from "@mantine/core";
import FTypography from "../../../ui/typography/FTypography";

interface IProps {
  id: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

const UserCustomerTable: React.FC<IProps> = ({ id, setPage, page }) => {
  const { data, isLoading } = useGetUserCustomers({ id, page, limit: 25 });
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
    <Flex direction={"column"}>
      <FTypography
        fontSize={"32px"}
        text={` Current Customer Count - ${results.length}`}
        variant={"oswald500"}
      />
      <DefaultTable
        columns={courtTable() as TTableColumns<unknown>[]}
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

export default UserCustomerTable;
