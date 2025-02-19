import React, { memo, useMemo, useState } from "react";
import classes from "./index.module.scss";
import { Box } from "@mantine/core";
import FButton from "../../ui/button/FButton";
import Pencil from "../../assets/icons/pencil";
import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import { centerTable } from "../../constants/CenterTable";
import useGetCentres from "../../hooks/centre/useGetCentres";
import { Modals } from "../../container/modal/Fmodals";
import UserModal from "../../container/modal/UserModal/UserModal";

const CenterPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetCentres({
    page,
    limit: 10,
    search: "",
  });

  const centres = useMemo(() => {
    if (data?.data && !isLoading) return data.data;
    return [];
  }, [data, isLoading, page]);

  const handleCreateCentre = () => {
    Modals({
      children: <UserModal id="" isCreateModal={true} />,
      title: "Add New Centre",
    });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.headerBlock}>
        <FButton
          label="Create New"
          variant="smallBtn"
          icon={<Pencil />}
          onClick={() => handleCreateCentre()}
        />
      </Box>
      <DefaultTable
        columns={centerTable as TTableColumns<unknown>[]}
        data={centres as unknown as []}
        isLoading={isLoading}
        paginationProps={{
          setPage,
          totalDocuments: data?.pageData?.totalDocuments!,
          totalPages: data?.pageData?.totalPages!,
        }}
      />
    </Box>
  );
};

export default memo(CenterPage);
