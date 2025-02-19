import { Box, Flex, Group } from "@mantine/core";
import React, { useState } from "react";
import FButton from "../../../ui/button/FButton";
import { useForm, yupResolver } from "@mantine/form";
import { object, string } from "yup";
import { modals } from "@mantine/modals";
import FInput from "../../../ui/input/finput/FInput";
import { DateInput } from "@mantine/dates";
import { useUpdateCustomerStatus } from "../../../hooks/users/useUpdateCustomerStatus";
import { notifications } from "@mantine/notifications";
import { queryClient } from "../../../client/queryClient";

interface IProps {
  status: string;
  id: string;
}

const ChangeCustomerStatusModal: React.FC<IProps> = ({ status, id }) => {
  const form = useForm({
    initialValues: {
      status,
      date: new Date(),
    },
    validate: yupResolver(
      object().shape({ status: string().required("status is required") })
    ),
  });

  const [isDateVisible, setIsDateVisible] = useState(false);

  form.watch("status", ({ value }) => {
    setIsDateVisible(value === "freetrial");
  });

  const { mutateAsync, isPending } = useUpdateCustomerStatus();

  const handleSubmit = async (e: { status: string; date: Date }) => {
    const response = await mutateAsync({ id, status: e.status });
    if (response.status === "error")
      return notifications.show({
        message: response.message,
        title: response.title,
        color: "red",
      });
    notifications.show({
      message: response.message,
      title: response.title,
      color: "green",
    });
    queryClient.invalidateQueries({
      queryKey: ["user", "customers", "customer count"],
    });
    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} gap={24}>
        <Box>
          <FInput
            label="Select Status"
            variant={"select"}
            data={[
              { label: "Not pick call", value: "NPC" },
              { label: "Call Back Later", value: "CBC" },
              // { label: "Assigned New", value: "assigned" },
              { label: "Switched off", value: "switchoff" },
              { label: "Out of Service", value: "outofservice" },
              { label: "Not Intrested", value: "notintrested" },
              { label: "Intrested", value: "intrested" },
              { label: "Free Trial", value: "freetrial" },
            ]}
            formHandler={form.getInputProps("status")}
          />
        </Box>
        {isDateVisible && (
          <Box>
            <DateInput
              label={"Select Free Trial Date"}
              {...form.getInputProps("date")}
            />
          </Box>
        )}
        <Group mt="md" justify="end">
          <Flex gap={"md"} maw={"350px"}>
            <FButton
              variant="outline"
              onClick={() => {
                form.reset();
                modals.closeAll();
              }}
              label="Cancel"
            />
            <FButton
              variant="filled"
              type="submit"
              loading={isPending}
              label={"Submit"}
            />
          </Flex>
        </Group>
      </Flex>
    </form>
  );
};

export default ChangeCustomerStatusModal;
