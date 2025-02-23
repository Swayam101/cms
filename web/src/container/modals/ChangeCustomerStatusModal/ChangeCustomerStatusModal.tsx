import React, { useMemo, useState } from "react";

import { Box, Flex, Group } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { DateInput } from "@mantine/dates";

import { object, string } from "yup";

import { queryClient } from "../../../client/queryClient";

import FButton from "../../../ui/button/FButton";
import FInput from "../../../ui/input/finput/FInput";

import { useUpdateCustomerStatus } from "../../../hooks/users/useUpdateCustomerStatus";
import CustomerStatuses from "../../../constants/CustomerStatuses";
import { useGetAllUser } from "../../../hooks/users/useGetAllUsers";

interface IProps {
  status: string;
  id: string;
}

const ChangeCustomerStatusModal: React.FC<IProps> = ({ status, id }) => {
  const role = localStorage.getItem("role");
  const isUser = role === "user";

  const form = useForm({
    initialValues: {
      status,
      date: new Date(),
      note: "",
      user: "",
    },
    validate: yupResolver(
      object().shape({ status: string().required("status is required") })
    ),
  });

  const [isDateVisible, setIsDateVisible] = useState(false);
  const [isAssignVisible, setIsAssignVisible] = useState(false);

  form.watch("status", ({ value }) => {
    if (value === "assigned" && isUser) {
      form.setFieldValue("status", "NPC");
      return notifications.show({
        message: "user cannot assign customer",
        color: "red",
        title: "UNAUTHORISED ACTION",
      });
    }
    setIsAssignVisible(value === "assigned");
    setIsDateVisible(value === "freetrial");
  });

  const { mutateAsync, isPending } = useUpdateCustomerStatus();

  const { data, isLoading } = useGetAllUser(
    {
      page: 1,
      limit: 50,
    },
    !isUser
  );

  const users = useMemo(() => {
    if (!isLoading && data?.data) return data.data.users;
    return [];
  }, [data, isLoading]);

  const handleSubmit = async (e: {
    status: string;
    date: Date;
    note?: string;
    user?: string;
  }) => {
    const response = await mutateAsync({
      id,
      isUser,
      status: e.status,
      note: e.note,
      date: e.date,
      user: e.user,
    });
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
            data={CustomerStatuses}
            formHandler={form.getInputProps("status")}
          />
        </Box>
        <Box>
          <FInput
            label="Enter Note"
            variant="text"
            formHandler={form.getInputProps("note")}
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
        {isAssignVisible && (
          <FInput
            label="Select User"
            variant={"select"}
            data={users.map(
              ({ _id, username }: { _id: string; username: string }) => ({
                label: username,
                value: _id,
              })
            )}
            formHandler={form.getInputProps("user")}
          />
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
              loading={isPending || isLoading}
              label={"Submit"}
            />
          </Flex>
        </Group>
      </Flex>
    </form>
  );
};

export default ChangeCustomerStatusModal;
