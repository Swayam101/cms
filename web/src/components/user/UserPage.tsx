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
import { IUserForm } from "../../types";
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

  const { allUser, pagination } = useMemo(() => {
    if (data?.data && !isLoading) {
      const { results, ...pagination } = data.data.users;
      return { allUser: data?.data?.users.results, pagination } as {
        allUser: IUserForm[];
        pagination: any;
      };
    }
    return {
      allUser: [],
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 1,
        totalDocuments: 0,
      },
    } as {
      allUser: [];
      pagination: any;
    };
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
          ...pagination,
        }}
      />
    </Box>
  );
};

export default memo(UserPage);
