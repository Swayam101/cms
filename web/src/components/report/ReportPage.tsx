import React, { memo, useMemo } from "react";
import classes from "./index.module.scss";
import { Box } from "@mantine/core";
import FButton from "../../ui/button/FButton";
import Pencil from "../../assets/icons/pencil";
import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import { Modals } from "../../container/modal/Fmodals";
import ReportModal from "../../container/ReportModal/ReportModal";
import { reportTable } from "../../constants/ReportTable";
import useGetReport from "../../hooks/report/useGetReport";

const ReportPage: React.FC = () => {
  const { data, isLoading } = useGetReport();
  const allReports = useMemo(() => {
    if (data?.data && !isLoading) return data?.data ?? [];
    return [];
  }, [data, isLoading]);
  const handleModal = () => {
    Modals({
      children: <ReportModal />,
      title: "Add New Report",
    });
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.headerBlock}>
        <FButton
          label="Create New"
          variant="smallBtn"
          icon={<Pencil />}
          onClick={handleModal}
        />
      </Box>
      <DefaultTable
        columns={reportTable as TTableColumns<unknown>[]}
        data={allReports}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default memo(ReportPage);
