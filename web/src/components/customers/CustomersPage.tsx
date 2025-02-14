import { Box, Flex } from "@mantine/core";
import React, { memo, useMemo, useState } from "react";
import classes from "./index.module.scss";
import FButton from "../../ui/button/FButton";
import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import Pencil from "../../assets/icons/pencil";
import { courtTable } from "../../constants/CustomerTable";
import useGetAllCustomers from "../../hooks/court/useGetAllCustomers";
import { useForm } from "@mantine/form";
import { Modals } from "../../container/modal/Fmodals";
import CourtModal from "../../container/modal/CustomerModal/CustomerModal";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import FInput from "../../ui/input/finput/FInput";

const CustomersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  form.watch("search", ({ value }) => setSearch(value));

  const { data, isLoading } = useGetAllCustomers({
    limit: 10,
    page,
    search,
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

  const handleOpenCourtModal = () => {
    Modals({
      title: "Add New Customer",
      children: <CourtModal isCreateModal />,
      size: "sm",
    });
  };

  return (
    <Box className={classes.root}>
      <Flex align={"flex-end"} className={classes.headerBlock}>
        <Box className={classes.left}>
          <FInput
            label="Search"
            variant="text"
            formHandler={form.getInputProps("search")}
          />
        </Box>
        <Box>
          <FInput
            variant="select"
            smallSelect
            label="User Filter"
            data={[{ label: "", value: "" }]}
          />
        </Box>
        <Box>
          <FButton
            onClick={handleOpenCourtModal}
            label="Create New Customer"
            variant="smallBtn"
            icon={<Pencil />}
          />
        </Box>
      </Flex>

      <DefaultTable
        columns={courtTable as TTableColumns<unknown>[]}
        data={results}
        isLoading={isLoading}
        paginationProps={{
          setPage,
          ...pagination,
        }}
      />
    </Box>
  );
};

export default memo(CustomersPage);
