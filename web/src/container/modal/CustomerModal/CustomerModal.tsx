import React, { useEffect } from "react";
import { Flex, Loader } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

import FInput from "../../../ui/input/finput/FInput";
import FButton from "../../../ui/button/FButton";

import { ICustomerData } from "../../../types";
import useCreateUpdateCourt from "../../../hooks/court/useCreateUpdateCustomer";
import customerInitialValues from "../../../initial-values/customer.initialValues";
import { createUpdateCustomerValidation } from "../../../validations/customer.validation";
import useGetCustomerById from "../../../hooks/court/useGetCustomerById";
import { queryClient } from "../../../client/queryClient";

interface ICreateCentreProps {
  isCreateModal: boolean;
  id?: string;
}

const CustomerModal: React.FC<ICreateCentreProps> = ({ isCreateModal, id }) => {
  const { data, isLoading } = useGetCustomerById(id ?? "");
  const { mutateAsync, isPending } = useCreateUpdateCourt();

  const form = useForm({
    initialValues: customerInitialValues,
    validate: yupResolver(createUpdateCustomerValidation),
  });

  useEffect(() => {
    if (data?.data && !isLoading && !isCreateModal) {
      const customer = data.data.customer;
      form.setValues(customer);
    }
  }, [data, isLoading]);

  const handleCreateFormSubmit = async (
    data: Pick<ICustomerData, "name" | "phone">
  ) => {
    const response = await mutateAsync(data);

    if (response.status === "error") {
      return notifications.show({
        message: response.message,
        title: response.title,
        color: "red",
      });
    }
    notifications.show({
      message: response.message,
      title: response.title,
      color: "green",
    });
    queryClient.invalidateQueries({ queryKey: ["court", "court_fetch"] });
    return modals.closeAll();
  };

  if (isLoading) {
    return (
      <Flex justify={"center"}>
        <Loader />
      </Flex>
    );
  }

  return (
    <form onSubmit={form.onSubmit((e) => handleCreateFormSubmit(e))}>
      <FInput
        label="Customer Name"
        placeholder="e.g. Sachin sixer"
        variant="text"
        formHandler={form.getInputProps("name")}
      />
      <FInput
        label="Customer Phone"
        placeholder="e.g. 6232065307"
        variant="text"
        formHandler={form.getInputProps("phone")}
      />
      <Flex direction={"column"}>
        <Flex justify="flex-end">
          <Flex gap={"md"} mt={12} w={"60%"}>
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
              label={isCreateModal ? "Create" : "Update"}
            />
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default CustomerModal;
