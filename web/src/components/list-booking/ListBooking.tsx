import React, { memo, useMemo, useState } from "react";
import useGetPaginatedBooking from "../../hooks/booking/useGetPaginatedBooking";
import classes from "./index.module.scss";
import { Box, Flex } from "@mantine/core";
import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import FTypography from "../../ui/typography/FTypography";
import { IBookingList } from "../../types";
import { ListBookingTable } from "../../constants/ListBookingTable";
import { useDebouncedValue } from "@mantine/hooks";
import SearchInput from "../../ui/input/search-input/SearchInput";
import { CONSTANTS } from "../Dynamic-Table/types/constants";

const ListBooking: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(search, 1000);
  const { data, isLoading } = useGetPaginatedBooking({
    limit: 10,
    page,
    search: debouncedSearchQuery.trim(),
  });
  const bookingData = useMemo(() => {
    if (!isLoading && data?.status === "success") {
      data?.pageData && setPageData(data.pageData.total ?? 0);
      return data.data as [];
    } else {
      return [];
    }
  }, [data, isLoading]);

  return (
    <Box className={classes.root}>
      <Box className={classes.left}>
        <FTypography
          fontSize={"28Ppx"}
          text="All Bookings"
          variant="oswald500"
        />
      </Box>
      <Flex>
        <SearchInput
          placeholder="Search here..."
          formHandler={{
            value: search,
            onChange: (e) => {
              setPage(1);
              setSearch(e.currentTarget.value);
            },
          }}
        />
      </Flex>
      <DefaultTable
        columns={ListBookingTable as TTableColumns<unknown>[]}
        data={bookingData as IBookingList[]}
        isLoading={isLoading}
        paginationProps={{
          setPage,
          totalDocuments: pageData,
          totalPages: Math.ceil(pageData / CONSTANTS.PAGE_LIMIT),
        }}
      />
    </Box>
  );
};

export default memo(ListBooking);
