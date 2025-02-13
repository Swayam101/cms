import React, { memo, useMemo, useState } from "react";
import classes from "./index.module.scss";
import { Box } from "@mantine/core";
import SearchInput from "../../ui/input/search-input/SearchInput";
import FButton from "../../ui/button/FButton";
import Sort from "../../assets/icons/sort";
import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import { userTable } from "../../constants/UserTable";
import { useGetAllUser } from "../../hooks/users/useGetAllUsers";
import { useDebouncedValue } from "@mantine/hooks";
import { CONSTANTS } from "../Dynamic-Table/types/constants";
const UserPage: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const [sorted, setSorted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 1000);
  const { data, isLoading } = useGetAllUser({
    page: activePage,
    sort: sorted ? { newName: 1 } : undefined,
    search: debouncedSearchQuery.trim(),
    limit: CONSTANTS.PAGE_LIMIT,
  });
  const allUser = useMemo(() => {
    if (data?.data && !isLoading) return data?.data?.data as [];
    return [];
  }, [data, isLoading, activePage]);
  return (
    <Box className={classes.root}>
      <Box className={classes.left}>
        <SearchInput
          placeholder="Search User"
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
          label="Sort"
          onClick={async () => {
            setSorted(!sorted);
          }}
          variant="smallBtn"
        />
      </Box>
      <DefaultTable
        columns={userTable as TTableColumns<unknown>[]}
        data={allUser}
        isLoading={isLoading}
        paginationProps={{
          setPage: setActivePage,
          totalPages: Math.ceil(
            (data?.data?.pageData?.total ?? 1) / CONSTANTS.PAGE_LIMIT
          ),
          totalDocuments: data?.data?.pageData?.total ?? 0,
        }}
      />
    </Box>
  );
};

export default memo(UserPage);
