import React, { memo } from "react";
import { Box, Flex, Table } from "@mantine/core";
import TableLoading from "./components/TableLoading";
import { TPaging } from "../types/table/tablePaging";
import Pagination from "../Pagination/Pagination";
import classes from "./index.module.scss";

interface IProps<T> {
  data: T[];
  columns: TTableColumns<T>[];
  isLoading: boolean;
  paginationProps?: TPaging;
}

const DefaultTable: React.FC<IProps<unknown>> = <T,>({
  data,
  columns,
  isLoading,
  paginationProps,
}: IProps<T>) => {
  return (
    <Box>
      <Box>
        {!isLoading ? (
          <Box className={classes.tableContainer}>
            <Table
              verticalSpacing={"md"}
              withRowBorders={false}
              style={{
                textAlign: "center",
                tableLayout: "auto",
              }}
              width={"100%"}
              classNames={{
                table: classes.table,
                tbody: classes.tbody,
                td: classes.td,
                th: classes.th,
                tr: classes.tr,
                thead: classes.thead,
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  {columns.map((item, index) => {
                    return (
                      <Table.Th
                        key={`${"_" + index}`}
                        style={{
                          textAlign: "center",
                          width: "15%",
                          minWidth: item.minWidth ?? "fit-content",
                        }}
                      >
                        {item.label}
                      </Table.Th>
                    );
                  })}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {(data?.length === 0 || !data?.length) && (
                  <Table.Tr style={{}}>
                    <Table.Td
                      colSpan={columns?.length}
                      style={{ textAlign: "center", fontWeight: 500 }}
                    >
                      No Data Found
                    </Table.Td>
                  </Table.Tr>
                )}
                {data?.length > 0 &&
                  data.map((item: any) => {
                    return (
                      <Table.Tr key={item._id}>
                        {columns.map((column, i) => {
                          return (
                            <Table.Td
                              style={{
                                width: column.minWidth,
                                whiteSpace: column.minWidth
                                  ? "normal"
                                  : "nowrap",
                              }}
                              key={`${"_" + i}`}
                            >
                              {column.renderCell ? (
                                <Flex justify={"center"}>
                                  {column.renderCell(item)}
                                </Flex>
                              ) : (
                                item[column.key]
                              )}
                            </Table.Td>
                          );
                        })}
                      </Table.Tr>
                    );
                  })}
              </Table.Tbody>
            </Table>
          </Box>
        ) : (
          <TableLoading />
        )}
        {paginationProps && (
          <Box pb={16} px={32}>
            <Pagination
              setPage={paginationProps.setPage}
              totalPages={paginationProps.totalPages}
              totalDocuments={paginationProps.totalDocuments}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default memo(DefaultTable);
