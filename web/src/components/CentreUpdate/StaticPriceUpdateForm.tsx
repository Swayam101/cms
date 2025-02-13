import { Box, Flex } from "@mantine/core";
import React, { memo } from "react";

import classes from "./index.module.scss";
import FTypography from "../../ui/typography/FTypography";
import FInput from "../../ui/input/finput/FInput";
import FButton from "../../ui/button/FButton";
import { useForm, yupResolver } from "@mantine/form";
import useUpdateCentrePricing from "../../hooks/centre/useUpdateCentrePricing";
import { IPricingUpdateForm } from "../../types";
import { notifications } from "@mantine/notifications";
import centrePricingUpdateInitialValues from "../../initial-values/centrePricingUpdate.initialValues";
import { capitalizeWords } from "../../utils/capitalize";
import { updateCentrePricing } from "../../validations/centre.validation";

interface IProps {
  courtPrice: { weekend: number; regular: number };
  slotPrice: { weekend: number; regular: number };
  id: string;
}

const StaticPriceUpdateForm: React.FC<IProps> = ({
  courtPrice,
  slotPrice,
  id,
}) => {
  const { mutateAsync, isPending } = useUpdateCentrePricing();

  const form = useForm({
    initialValues: centrePricingUpdateInitialValues(courtPrice, slotPrice, id),
    validate: yupResolver(updateCentrePricing),
  });

  const handleSubmit = async (formData: IPricingUpdateForm) => {
    const response = await mutateAsync(formData);
    if (response.status === "error") {
      return notifications.show({
        message: capitalizeWords(response.message),
        color: "red",
      });
    }
    return notifications.show({
      message: capitalizeWords(response.message),
      color: "green",
    });
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className={classes.formContainer}
    >
      <Flex direction={"column"} gap={40}>
        <Flex>
          <Flex direction={"column"} justify={"flex-start"} gap={15} w={"50%"}>
            <Flex direction={"column"} w={"50%"}>
              <FTypography
                text={"Court Price"}
                fontSize={"22px"}
                variant="nunito700"
              />

              <FInput
                label="Weekend Price"
                variant="number"
                formHandler={form.getInputProps("courtPrice.weekend")}
                disabled={isPending}
              />

              <FInput
                label="Regular Price"
                variant="number"
                formHandler={form.getInputProps("courtPrice.regular")}
                disabled={isPending}
              />
            </Flex>
          </Flex>
          <Flex direction={"column"} justify={"flex-start"} gap={15} w={"50%"}>
            <Flex direction={"column"} w={"50%"}>
              <FTypography
                text={"Open Play Price"}
                fontSize={"22px"}
                variant="nunito700"
              />
              <FInput
                label="Weekend Price"
                variant="number"
                formHandler={form.getInputProps("slotPrice.weekend")}
                disabled={isPending}
              />
              <FInput
                label="Regular Price"
                variant="number"
                formHandler={form.getInputProps("slotPrice.regular")}
                disabled={isPending}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex justify={"flex-start"}>
          <Box>
            <FButton
              type="submit"
              label="Update"
              variant={"filled"}
              loading={isPending}
            />
          </Box>
        </Flex>
      </Flex>
    </form>
  );
};

export default memo(StaticPriceUpdateForm);
