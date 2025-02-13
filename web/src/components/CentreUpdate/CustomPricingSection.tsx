import { Box, Flex, Loader } from "@mantine/core";
import React, { memo, useMemo, useState } from "react";
import classes from "./index.module.scss";

import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import { customPricingTable } from "../../constants/CustomPricingTable";
import useGetCustomPricing from "../../hooks/centre/useGetCustomPricing";
import { CONSTANTS } from "../Dynamic-Table/types/constants";
import FTypography from "../../ui/typography/FTypography";
import FInput from "../../ui/input/finput/FInput";
import FButton from "../../ui/button/FButton";
import { useForm } from "@mantine/form";
import { Modals } from "../../container/modal/Fmodals";
import CustomPricingModal from "../../container/modal/CustomPricingModal.tsx/CustomPricingModal";

interface IProps {
  id: string;
}

const CustomPricingSection: React.FC<IProps> = ({ id }) => {
  const [page, setPage] = useState(1);

  const form = useForm({
    initialValues: { startDate: null, endDate: null },
  });

  const { data, isLoading, isError, error } = useGetCustomPricing(id, {
    limit: CONSTANTS.PAGE_LIMIT,
    page,
    startDate: form.getValues().startDate,
    endDate: form.getValues().endDate,
  });

  const tableData = useMemo(() => {
    if (isError) {
      console.log("is error", isError);
      console.log("error : ", error);
    }
    if (data?.data && !isLoading) {
      return data.data;
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return <Loader />;
  }

  const handleCreatePricing = () => {
    Modals({
      children: <CustomPricingModal isCreateModal center={id} />,
      title: "Add New Custom Pricing",
    });
  };

  return (
    <Box>
      <Flex
        className={classes.tableContainer}
        align={"center"}
        justify={"space-between"}
      >
        <Box>
          <FTypography
            text="Custom Pricing Data"
            fontSize={"20px"}
            variant="nunito700"
          />
        </Box>
        <Flex justify={"center"} align={"center"} gap={40}>
          <Box>
            <form onSubmit={form.onSubmit(() => {})}>
              <Flex gap={20}>
                <FInput
                  variant="date"
                  label=""
                  placeholder="Select Start Date"
                  formHandler={form.getInputProps("startDate")}
                  noClearDate
                  resetDate={() => {
                    form.setFieldValue("startDate", null);
                  }}
                />
                <FInput
                  variant="date"
                  label=""
                  placeholder="Select End Date"
                  formHandler={form.getInputProps("endDate")}
                  noClearDate
                  resetDate={() => {
                    form.setFieldValue("endDate", null);
                  }}
                />
              </Flex>
            </form>
          </Box>
          <Box>
            <FButton
              type="button"
              variant="filled"
              label="Add Custom Pricing"
              onClick={handleCreatePricing}
            />
          </Box>
        </Flex>
      </Flex>
      <Box className={classes.table}>
        <DefaultTable
          isLoading={isLoading}
          data={tableData}
          columns={customPricingTable as TTableColumns<unknown>[]}
          paginationProps={{
            setPage,
            totalDocuments: data?.pageData?.total!,
            totalPages: Math.ceil(
              Number(data?.pageData?.total ?? 1) / CONSTANTS.PAGE_LIMIT
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default memo(CustomPricingSection);
