import { Flex } from "@mantine/core";
import React from "react";
import DefaultTable from "../../../components/Dynamic-Table/table/DefaultTable";
import { ICustomPricingAddForm } from "../../../types";
import { customPricingErrorTable } from "../../../constants/CustomPricingError";
import FButton from "../../../ui/button/FButton";
import { modals } from "@mantine/modals";
import FTypography from "../../../ui/typography/FTypography";

interface IProps {
  tableData: ICustomPricingAddForm[];
}

const CustomPricingErrorModal: React.FC<IProps> = ({ tableData }) => {
  return (
    <Flex mih={"500px"} justify={"space-between"} direction={"column"}>
      <FTypography
        text="Select adjust overlappings to adjust according to available dates"
        fontSize={18}
        variant="nunito700"
      />
      <DefaultTable
        data={tableData}
        columns={customPricingErrorTable as TTableColumns<unknown>[]}
        isLoading={false}
      />
      <Flex justify="flex-end">
        <Flex gap={"md"} w={"50%"} mt={12}>
          <FButton
            variant="outline"
            onClick={() => {
              modals.closeAll();
            }}
            label="Back"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomPricingErrorModal;
