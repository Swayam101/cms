import React, { memo, useEffect } from "react";
import { Checkbox, Flex, Loader } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

import FInput from "../../../ui/input/finput/FInput";
import FButton from "../../../ui/button/FButton";

import { ICustomPricingAddForm } from "../../../types";

import { queryClient } from "../../../client/queryClient";
import useGetCustomPricingById from "../../../hooks/centre/useGetCustomPricingById";
import useAddCustomPricing from "../../../hooks/centre/useAddCustomPricing";
import customPricingValidation from "../../../validations/customPricingValidation";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { IServerResponse } from "../../../interfaces/serverResponse.interface";
import { Modals } from "../Fmodals";
import CustomPricingErrorModal from "../CustomPricingErrorModal/CustomPricingErrorModal";

interface IProps {
  isCreateModal: boolean;
  id?: string;
  center: string;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IServerResponse, Error>>;
}

const CustomPricingModal: React.FC<IProps> = ({
  isCreateModal,
  id,
  center,
  refetch,
}) => {
  const { data, isLoading } = useGetCustomPricingById(id ?? "");
  const { mutateAsync, isPending } = useAddCustomPricing();

  const form = useForm<ICustomPricingAddForm>({
    initialValues: {
      startDate: new Date(),
      endDate: new Date(),
      price: {
        court: 0,
        slot: 0,
      },
      id: id ?? undefined,
      center,
      adjustOverlap: false,
    },
    validate: yupResolver(customPricingValidation),
  });

  useEffect(() => {
    if (data?.data && !isLoading && !isCreateModal) {
      const startDate = new Date(data.data.startDate);
      const endDate = new Date(data.data.endDate);
      data.data.startDate = startDate;
      data.data.endDate = endDate;
      form.setValues(data.data);
    }
  }, [data, isLoading]);

  const handleCreateFormSubmit = async (data: ICustomPricingAddForm) => {
    const response = await mutateAsync(data);

    if (response.message === "custom pricing overlap check") {
      return Modals({
        children: (
          <CustomPricingErrorModal
            tableData={response.data.overlappingPricings}
          />
        ),
        title: "Custom Pricing Overlaps",
      });
    }
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
    if (refetch) {
      refetch();
    } else {
      queryClient.invalidateQueries({ queryKey: ["centre-custom-pricing"] });
    }
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
      <Flex m={"lg"} gap={"md"} direction={"column"}>
        <Flex direction={"column"} align={"center"} justify={"center"} gap={32}>
          <Flex gap={20}>
            <FInput
              label="Start Date"
              placeholder="Start Date of pricing"
              variant="date"
              isTodayDate
              formHandler={form.getInputProps("startDate")}
            />
            <FInput
              label="End Date"
              placeholder="Date of pricing"
              variant="date"
              isTodayDate
              formHandler={form.getInputProps("endDate")}
            />
          </Flex>
          <Flex gap={20}>
            <FInput
              label="Enter Court Price"
              placeholder="Court Price"
              variant="number"
              formHandler={form.getInputProps("price.court")}
            />

            <FInput
              label="Enter Slot Price"
              placeholder="Slot Price"
              variant="number"
              formHandler={form.getInputProps("price.slot")}
            />
          </Flex>
          <Flex pl={"40px"} ml={"lg"} w={"100%"} justify={"flex-start"}>
            <Checkbox
              label="Adjust Overlappings"
              {...form.getInputProps("adjustOverlap")}
            />
          </Flex>
        </Flex>
        <Flex justify="flex-end">
          <Flex gap={"md"} w={"50%"} mt={12}>
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

export default memo(CustomPricingModal);
