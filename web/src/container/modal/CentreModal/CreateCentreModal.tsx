import React, { useEffect, useState } from "react";
import { Box, Flex, Group, Loader, SimpleGrid } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

import FInput from "../../../ui/input/finput/FInput";
import FButton from "../../../ui/button/FButton";

import useGetCentreById from "../../../hooks/centre/useGetCentreById";
import useCreateCentre from "../../../hooks/centre/useCreateCentre";
import useUpdateCentre from "../../../hooks/centre/useUpdateCentre";

import { createCentre } from "../../../validations/centre.validation";
import { centreInitialValues } from "../../../initial-values/centre.initialValue";

import { ICentreForm } from "../../../types";
import { convertTo24HourFormat } from "../../../utils/timeUtils";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { IServerResponse } from "../../../interfaces/serverResponse.interface";
import { queryClient } from "../../../client/queryClient";
import FTypography from "../../../ui/typography/FTypography";
import SlotsInput from "./components/slots-input/SlotsInput";
import createFormData from "./createFormData";

interface ICreateCentreProps {
  isCreateModal: boolean;
  centreId?: string;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IServerResponse, Error>>;
}

const amenities = [
  { value: "drinking water", label: "Drinking Water" },
  { value: "seating area", label: "Seating Area" },
  { value: "rental equipment", label: "Rental Equipment" },
  { value: "cafe", label: "Cafe" },
  { value: "parking", label: "Parking" },
  { value: "shower room", label: "Shower Room" },
  { value: "rest room", label: "Rest Room" },
];

const CreateCentreModal: React.FC<ICreateCentreProps> = ({
  isCreateModal,
  centreId,
  refetch,
}) => {
  const { data, isLoading } = useGetCentreById(centreId ?? "");

  const [isEditImage, setIsEditImage] = useState(false);
  const [imagesState, setImagesState] = useState<string[]>([]);
  const { mutateAsync, isPending } = useCreateCentre();
  const { mutateAsync: editMutateAsync, isPending: editPending } =
    useUpdateCentre();

  const form = useForm({
    initialValues: centreInitialValues,
    validate: yupResolver(createCentre),
  });

  useEffect(() => {
    if (data?.data && !isLoading && !isCreateModal) {
      data.data.openTime = convertTo24HourFormat(data.data.openTime);
      data.data.closeTime = convertTo24HourFormat(data.data.closeTime);
      form.setValues(data.data);
      setImagesState(data.data.images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);
  const removeImage = (imageToRemove: string) => {
    const updatedImages = imagesState.filter(
      (image) => image !== imageToRemove
    );
    setImagesState(updatedImages);
  };
  const handleCreateFormSubmit = async (data: ICentreForm) => {
    let response;

    const newData = createFormData({ data, imagesState, centreId });
    if (isCreateModal)
      response = await mutateAsync(newData as unknown as ICentreForm);
    else response = await editMutateAsync(newData as unknown as ICentreForm);

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
      queryClient.invalidateQueries({ queryKey: ["centre"] });
    }
    // return modals.closeAll();
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
        <FInput
          label="Name"
          placeholder="Name"
          variant="text"
          formHandler={form.getInputProps("name")}
        />
        <FInput
          label="Description"
          placeholder="Description"
          variant="longtext"
          formHandler={form.getInputProps("description")}
        />
        <Flex direction={"column"}>
          <FTypography
            fontSize={16}
            text={"Regular Pricing"}
            variant="oswald500"
          />
          <Flex align={"center"} gap={32}>
            <FInput
              label="Court Price"
              placeholder="Court Price"
              variant="number"
              formHandler={form.getInputProps("priceCourt.regular")}
            />
            <FInput
              label="Slot Price"
              placeholder="Slot Price"
              variant="number"
              formHandler={form.getInputProps("priceSlot.regular")}
            />
          </Flex>
        </Flex>
        <Flex direction={"column"}>
          <FTypography
            fontSize={16}
            text={"Weekend Pricing"}
            variant="oswald500"
          />
          <Flex align={"center"} gap={32}>
            <FInput
              label="Court Price"
              placeholder="Court Price"
              variant="number"
              formHandler={form.getInputProps("priceCourt.weekend")}
            />
            <FInput
              label="Slot Price"
              placeholder="Slot Price"
              variant="number"
              formHandler={form.getInputProps("priceSlot.weekend")}
            />
          </Flex>
        </Flex>
        <FInput
          label="Amenities"
          placeholder="Select Amenities"
          variant="multiselect"
          formHandler={form.getInputProps("amenities")}
          data={amenities}
        />
        <Flex align={"center"} gap={32} w={"100%"}>
          <FInput
            label="Latitude"
            placeholder="Enter Latitude"
            variant="number"
            formHandler={form.getInputProps("location.lat")}
          />
          <FInput
            label="Longitude"
            placeholder="Enter Longitude"
            variant="number"
            formHandler={form.getInputProps("location.long")}
          />
        </Flex>
        <FInput
          label="Address"
          placeholder="Enter Address "
          variant="longtext"
          formHandler={form.getInputProps("address")}
        />
        <SimpleGrid cols={2} spacing={"md"}>
          <FInput
            label="Open Time"
            placeholder="Select Open Time"
            variant="time"
            formHandler={form.getInputProps("openTime")}
          />
          <FInput
            label="Close Time"
            placeholder="Select Close Time"
            variant="time"
            formHandler={form.getInputProps("closeTime")}
          />
        </SimpleGrid>
        <SlotsInput form={form} />

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
              loading={isPending || editPending}
              label={isCreateModal ? "Create" : "Submit"}
            />
          </Flex>
        </Group>
      </Flex>
    </form>
  );
};

export default CreateCentreModal;
