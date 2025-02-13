import React, { useEffect } from "react";
import { Flex, Loader } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

import FInput from "../../../ui/input/finput/FInput";
import FButton from "../../../ui/button/FButton";

import { ICourtForm } from "../../../types";
import { convertTo24HourFormat } from "../../../utils/timeUtils";
import useCreateUpdateCourt from "../../../hooks/court/useCreateUpdateCourt";
import courtInitialValues from "../../../initial-values/court.initialValues";
import { createUpdateCourtValidation } from "../../../validations/court.validation";
import useGetCourtById from "../../../hooks/court/useGetCourtById";
import { queryClient } from "../../../client/queryClient";

interface ICreateCentreProps {
  isCreateModal: boolean;
  courtId?: string;
  centreId?: string;
}

const CourtModal: React.FC<ICreateCentreProps> = ({
  isCreateModal,
  courtId,
  centreId,
}) => {
  const { data, isLoading } = useGetCourtById(courtId ?? "");
  const { mutateAsync, isPending } = useCreateUpdateCourt();

  const form = useForm({
    initialValues: courtInitialValues,
    validate: yupResolver(createUpdateCourtValidation),
  });

  useEffect(() => {
    if (data?.data && !isLoading && !isCreateModal) {
      data.data.openTime = convertTo24HourFormat(data.data.openTime);
      data.data.closeTime = convertTo24HourFormat(data.data.closeTime);
      form.setValues(data.data);
    }
  }, [data, isLoading]);

  const handleCreateFormSubmit = async (data: ICourtForm) => {
    const courtData = {
      courtId: courtId ?? "",
      courtData: { ...data, centre: centreId },
    };
    const response = await mutateAsync(courtData);

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
        label="Court Name"
        placeholder="Court Name"
        variant="text"
        formHandler={form.getInputProps("name")}
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

export default CourtModal;
