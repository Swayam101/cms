import { Box, Flex } from "@mantine/core";
import React from "react";
import styles from "./index.module.scss";
import FTypography from "../../ui/typography/FTypography";
import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import { editBlockSlotsTable } from "../../constants/EditBlockedSlotsTable";
import { useSearchParams } from "react-router-dom";
import useGetCentreBlockedSlotsByDate from "../../hooks/booking/useGetCentreBlockedSlotsByDate";
import FInput from "../../ui/input/finput/FInput";
import { useForm } from "@mantine/form";

const EditBlockedSlotsPage: React.FC = () => {
  const [search] = useSearchParams();

  const date = new Date(search.get("date") ?? "");

  const { data, isLoading } = useGetCentreBlockedSlotsByDate(
    search.get("centre") ?? "",
    date
  );

  const form = useForm({
    initialValues: { date },
  });

  return (
    <Box>
      <Flex gap={4}>
        <FTypography
          text={`Blocked Slots for`}
          fontSize={26}
          variant="oswald500"
        />
        <FTypography
          text={` \t ${search.get("name")}`}
          fontSize={26}
          variant="oswald500"
          color="blue"
        />
      </Flex>
      <Flex classNames={{ root: styles.root }}>
        <Box>
          <FInput
            variant="date"
            label="Selected Date"
            formHandler={form.getInputProps("date")}
            disabled
          />
        </Box>
      </Flex>
      <DefaultTable
        columns={editBlockSlotsTable as TTableColumns<unknown>[]}
        data={data?.data ?? []}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default EditBlockedSlotsPage;
