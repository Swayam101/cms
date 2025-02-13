import { Box } from "@mantine/core";
import React, { memo, useMemo, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

import classes from "./index.module.scss";

import SearchInput from "../../ui/input/search-input/SearchInput";
import FButton from "../../ui/button/FButton";

import Sort from "../../assets/icons/sort";
import Pencil from "../../assets/icons/pencil";

import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import AdminModal from "../../container/modal/AdminModal/UploadLogsModel";
import { Modals } from "../../container/modal/Fmodals";
import { UploadLogTable } from "../../constants/UploadLogTable";
import { useGetAllAdmin } from "../../hooks/admin/useGetAllAdmin";

import { CONSTANTS } from "../Dynamic-Table/types/constants";
const AdminPage: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const [sorted, setSorted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 1000);
  const { data, isLoading } = useGetAllAdmin({
    page: activePage,
    sort: sorted ? { name: 1 } : undefined,
    search: debouncedSearchQuery.trim(),
    limit: CONSTANTS.PAGE_LIMIT,
  });
  const allAdmin = useMemo(() => {
    if (data?.data && !isLoading) return data.data;
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, activePage]);
  const handleUploadCustomerData = (isUpload: boolean) => {
    Modals({
      children: <AdminModal isUpload={isUpload} />,
      title: isUpload ? "Upload Customer Data" : "Verify Data File",
    });
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.headerBlock}>
        <Box className={classes.left}>
          <SearchInput
            placeholder="Search Upload Logs"
            formHandler={{
              value: searchQuery,
              onChange: (eve) => {
                setActivePage(1);
                setSearchQuery(eve.currentTarget.value);
              },
            }}
          />
          <FButton
            icon={<Sort />}
            onClick={() => {
              setSorted(!sorted);
            }}
            label="Sort"
            variant="smallBtn"
          />
        </Box>

        <FButton
          label="Upload Customers"
          onClick={() => handleUploadCustomerData(true)}
          variant="smallBtn"
          icon={<Pencil />}
        />
        <FButton
          label="Verify Customer Data"
          onClick={() => handleUploadCustomerData(false)}
          variant="smallBtn"
          icon={<Pencil />}
        />
      </Box>
      <DefaultTable
        columns={UploadLogTable as TTableColumns<unknown>[]}
        data={allAdmin}
        isLoading={isLoading}
        paginationProps={{
          setPage: setActivePage,
          totalPages: Math.ceil(
            (data?.pageData?.total ?? 1) / CONSTANTS.PAGE_LIMIT
          ),
          totalDocuments: data?.pageData?.total ?? 0,
        }}
      />
    </Box>
  );
};

export default memo(AdminPage);
