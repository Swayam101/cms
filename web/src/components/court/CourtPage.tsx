import { Box } from "@mantine/core";
import React, { memo } from "react";
import classes from "./index.module.scss";
import FButton from "../../ui/button/FButton";
import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import Pencil from "../../assets/icons/pencil";
import { courtTable } from "../../constants/CourtTable";
import useGetAllCourts from "../../hooks/court/useGetAllCourts";
import { useForm } from "@mantine/form";
import { Modals } from "../../container/modal/Fmodals";
import CourtModal from "../../container/modal/CourtModal/CourtModal";
import { useAppSelector } from "../../app/hooks";
import { ADMIN_ROLES } from "../../enum/admin.enum";
import FTypography from "../../ui/typography/FTypography";
import CenterSearchSelect from "../../container/center-search-select/CenterSearchSelect";

const CourtPage: React.FC = () => {
  const { role } = useAppSelector((state) => state.userData.userData);

  const form = useForm({
    initialValues: {
      centre: "",
    },
  });

  const { data: courtData, isLoading } = useGetAllCourts(
    form.getValues().centre ?? ""
  );

  const handleOpenCourtModal = () => {
    Modals({
      title: "Add New Court",
      children: <CourtModal isCreateModal centreId={form.getValues().centre} />,
      size: "sm",
    });
  };

  return (
    <Box className={classes.root}>
      {role === ADMIN_ROLES.CENTRE_MANAGER ? (
        <FTypography fontSize={"24px"} text="Courts" variant="oswald500" />
      ) : (
        <Box className={classes.headerBlock}>
          <Box className={classes.left}>
            <CenterSearchSelect
              onChange={(e) => {
                form.setFieldValue("centre", e.value);
              }}
              value={form.values.centre ?? ""}
            />
          </Box>
          <FButton
            onClick={handleOpenCourtModal}
            label="Create New"
            variant="smallBtn"
            icon={<Pencil />}
            disable={form.getValues()?.centre?.valueOf?.length > 0}
          />
        </Box>
      )}
      <DefaultTable
        columns={courtTable as TTableColumns<unknown>[]}
        data={courtData?.data}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default memo(CourtPage);
