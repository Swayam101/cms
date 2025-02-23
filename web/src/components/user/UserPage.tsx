import React, { memo, useMemo, useState } from "react";
import classes from "./index.module.scss";
import { Box, Flex } from "@mantine/core";
import SearchInput from "../../ui/input/search-input/SearchInput";
import FButton from "../../ui/button/FButton";
import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import { userTable } from "../../constants/UserTable";
import { useGetAllUser } from "../../hooks/users/useGetAllUsers";
import { useDebouncedValue } from "@mantine/hooks";
import { CONSTANTS } from "../Dynamic-Table/types/constants";
import { IconEdit } from "@tabler/icons-react";
import { Modals } from "../../container/modals/Fmodals";
import UserModal from "../../container/modals/UserModal/UserModal";
const UserPage: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 1000);
  const { data, isLoading } = useGetAllUser(
    {
      page: activePage,
      search: debouncedSearchQuery.trim(),
      limit: CONSTANTS.PAGE_LIMIT,
    },
    true
  );

  const handleCreateNewUser = () => {
    Modals({
      title: "Add New User",
      children: <UserModal isCreateModal id="" />,
      size: "sm",
    });
  };

  const allUser = useMemo(() => {
    if (data?.data && !isLoading) return data?.data?.users as [];
    return [];
  }, [data, isLoading]);

  return (
    <Box className={classes.root}>
      <Flex align={"center"} gap={24}>
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
        </Box>

        <FButton
          label="Create New User"
          variant={"smallBtn"}
          icon={<IconEdit />}
          onClick={handleCreateNewUser}
        />
      </Flex>
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
