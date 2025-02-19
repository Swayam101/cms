import { Flex, Group } from "@mantine/core";
import React from "react";
import FInput from "../../../ui/input/finput/FInput";
import { useForm, yupResolver } from "@mantine/form";
import { number, object } from "yup";
import FButton from "../../../ui/button/FButton";
import { modals } from "@mantine/modals";
import { useAssignUserCustomers } from "../../../hooks/users/useAssignUserCustomers";
import { notifications } from "@mantine/notifications";
import { queryClient } from "../../../client/queryClient";

interface IProps {
  id: string;
}

const AssignCustomersModal: React.FC<IProps> = ({ id }) => {
  const form = useForm({
    initialValues: {
      customers: 0,
    },
    validate: yupResolver(object().shape({ customers: number().min(1) })),
  });

  const { mutateAsync, isPending } = useAssignUserCustomers();

  const handleFormSubmit = async (e: { customers: number }) => {
    const response = await mutateAsync({ id, customerCount: e.customers });

    if (response.status === "error")
      return notifications.show({
        message: response.message,
        color: "red",
        title: response.title,
      });
    await queryClient.invalidateQueries({
      queryKey: ["user", "customers", "customer count"],
    });
    modals.closeAll();
    return notifications.show({
      message: response.message,
      color: "green",
      title: response.title,
    });
  };

  return (
    <form onSubmit={form.onSubmit((e) => handleFormSubmit(e))}>
      <Flex m={"lg"} gap={"md"} direction={"column"}>
        <input type="text" name="fakeuser" style={{ display: "none" }} />
        <FInput
          label="Enter No. Of Customers"
          placeholder="e.g. 10"
          variant={"number"}
          formHandler={form.getInputProps("customers")}
        />

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

export default AssignCustomersModal;
