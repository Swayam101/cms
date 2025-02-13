import { Flex, Box, Divider, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { memo, useState } from "react";
import FInput from "../../ui/input/finput/FInput";
import FButton from "../../ui/button/FButton";
import { bulkBookingValidation } from "../../validations/bulkBooking.validation";
import { bulkBookingInitialValues } from "../../initial-values/bulkBooking.initialValue";
import CenterSearchSelect from "../../container/center-search-select/CenterSearchSelect";
import { Modals } from "../../container/modal/Fmodals";
import RightCards from "./RightCards";
import FCheckBoxWithSelectAll from "../../ui/input/check-box/FCheckBoxWithSelectAll";

const BulkBooking = () => {
  const [error, setError] = useState("");
  const form = useForm({
    initialValues: bulkBookingInitialValues,
    validate: yupResolver(bulkBookingValidation),
  });

  const handleErrors = () => {
    Modals({
      children: <Text>{error}</Text>,
      title: "Please check the inputs once",
      centered: true,
      size: "lg",
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("form.values", form.values);
    } catch (error: unknown) {
      const msg = (error as Error).message;
      setError(msg);
      handleErrors();
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex>
        <Flex
          mr={"lg"}
          ml={"sm"}
          gap="md"
          direction="column"
          style={{ width: "50%" }}
        >
          <Box>
            <CenterSearchSelect
              onChange={(e) => {
                form.setFieldValue("centre", e.value);
              }}
              value={form.values.centre ?? ""}
            />
          </Box>
          <Divider />

          <Box>
            <Text fw={700}>COURTS</Text>
            <FCheckBoxWithSelectAll
              data={[
                { _id: "Court 1", name: "Court 1" },
                { _id: "Court 2", name: "Court 2" },
                { _id: "Court 3", name: "Court 3" },
                { _id: "Court 4", name: "Court 4" },
                { _id: "Court 5", name: "Court 5" },
              ]}
              field={"courts"}
              form={form}
              label=""
            />
          </Box>

          <Divider />
          <Box>
            <Text fw={700}>DATE</Text>
            <Flex mt={"xs"} gap={"xl"}>
              <FInput
                label="From"
                variant="date"
                occupyfullWidth
                placeholder="From Date"
                formHandler={form.getInputProps("fromDate")}
              />
              <FInput
                label="to"
                variant="date"
                occupyfullWidth
                placeholder="To Date"
                formHandler={form.getInputProps("toDate")}
              />
            </Flex>
          </Box>
          <Divider />
          <Box>
            <Text fw={700}>DAYS</Text>
            <FCheckBoxWithSelectAll
              data={[
                { _id: "monday", name: "Monday" },
                { _id: "tuesday", name: "Tuesday" },
                { _id: "wednesday", name: "Wednesday" },
                { _id: "thursday", name: "Thursday" },
                { _id: "friday", name: "Friday" },
                { _id: "saturday", name: "Saturday" },
                { _id: "sunday", name: "Sunday" },
              ]}
              field={"days"}
              form={form}
              label=""
            />
          </Box>

          <Divider />
          <Box>
            <Text fw={700}>TIME</Text>
            <Flex mt={"xs"} gap={"xl"}>
              <FInput
                label="From"
                variant="time"
                occupyfullWidth
                placeholder="From Date"
                formHandler={form.getInputProps("fromTime")}
              />
              <FInput
                label="to"
                variant="time"
                occupyfullWidth
                placeholder="To Time"
                formHandler={form.getInputProps("toTime")}
              />
            </Flex>
          </Box>
          <Divider />
          <Box>
            <Flex mt={"xs"} gap={"xl"} style={{ width: "100%" }}>
              <FButton label="Reset" variant="outline" onClick={form.reset} />
              <FButton label="Submit" variant="filled" type="submit" />
            </Flex>
          </Box>
        </Flex>
        <Divider orientation="vertical" />
        <RightCards />
      </Flex>
    </form>
  );
};

export default memo(BulkBooking);
