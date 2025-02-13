import { Flex, SimpleGrid } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { memo, useMemo } from "react";
import { modals } from "@mantine/modals";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

import FInput from "../../../ui/input/finput/FInput";
import FButton from "../../../ui/button/FButton";
import FTypography from "../../../ui/typography/FTypography";

import { IServerResponse } from "../../../interfaces/serverResponse.interface";
import { IBlockedSlotsForm } from "../../../types";
import { Slot } from "../../../utils/slotSelectionLogic";
import { getBlockEventSlotsInitialValues } from "../../../initial-values/blockEventSlots.initialValues";
import useChangeBlockStatus from "../../../hooks/booking/useChangeBlockStatus";
import useGetAvailableCourts from "../../../hooks/court/useGetAvailableCourts";
import blockSlotValidation from "../../../validations/blockSlot.validation";

interface IProps {
  data: IBlockedSlotsForm;
  slots: Slot[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IServerResponse, Error>>;
  setSelectedSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
}

const BlockSlotModal = ({ data, slots, refetch, setSelectedSlots }: IProps) => {
  const { mutateAsync, isPending } = useChangeBlockStatus();
  const { data: courtData, isLoading } = useGetAvailableCourts({
    centre: data.centerId,
    date: data.bookingDate,
    slots: slots.map(({ id }) => id),
  });

  const form = useForm<IBlockedSlotsForm>({
    initialValues: getBlockEventSlotsInitialValues({
      ...data,
      slots: slots.map((item) => getFormateTime(item.id)),
    }),
    validate: yupResolver(blockSlotValidation),
  });

  const handleSubmit = (values: IBlockedSlotsForm) => {
    blockEventSlotsMutation(values);
  };

  form.watch("courts", ({ value, previousValue }) => {
    if (value!.length! > numberOfAvailable) {
      form.setFieldValue("courts", previousValue);
      notifications.show({
        title: "No Courts Available",
        message: `Only ${numberOfAvailable} Court(s) ${
          numberOfAvailable > 1 ? "Are" : "Is"
        } Available!`,
        id: "court unavailable",
      });
    }
  });

  const { courts: availableCourts, numberOfAvailable } = useMemo(() => {
    if (courtData?.data && !isLoading) {
      return {
        courts: courtData.data.availableCourts.map(
          ({ name, _id }: { name: string; _id: string }) => ({
            label: name,
            value: _id,
          })
        ),
        numberOfAvailable: courtData.data.numberOfAvailable,
      };
    }
    return { courts: [], numberOfAvailable: 0 };
  }, [courtData, isLoading]);

  const blockEventSlotsMutation = async (values: IBlockedSlotsForm) => {
    const res = await mutateAsync({
      bookingDate: values.bookingDate,
      note: values.note,
      centerId: values.centerId,
      slots: slots.map(({ id }) => id),
      courts: values.courts,
    });

    if (res.status === "error") {
      modals.closeAll();
      if (res.data) {
        res.data.slotsBlocked.forEach((element: { slots: string[] }) => {
          notifications.show({
            message: `${element.slots[0]} has no courts available!`,
            title: res.title,
            color: "red",
          });
        });
      }

      return notifications.show({
        message: res.message,
        title: res.title,
        color: "red",
      });
    }

    notifications.show({
      message: res.message,
      title: res.title,
      color: "green",
    });
    refetch();
    setSelectedSlots([]);
    return modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex m="lg" gap="md" direction="column">
        <FInput
          label="Slot date"
          variant="date"
          placeholder="04-10-2024"
          formHandler={form.getInputProps("bookingDate")}
          disabled
        />
        <SimpleGrid cols={1}>
          <FInput
            label="Selected Slots"
            variant="multiselect"
            disabled
            formHandler={form.getInputProps("slots")}
          />
        </SimpleGrid>
        <FInput
          label="Note"
          placeholder="Enter A Note"
          variant="text"
          formHandler={form.getInputProps("note")}
        />
        {availableCourts.length > 0 ? (
          <FInput
            label="Select Courts"
            variant="multiselect"
            data={availableCourts}
            formHandler={form.getInputProps("courts")}
          />
        ) : (
          <FTypography
            text="No Courts Available"
            fontSize={16}
            variant="nunito400"
          />
        )}
        <Flex justify={"flex-end"}>
          <Flex gap="md" justify={"flex-end"} w={"60%"}>
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
              label={"Block Slot(s)"}
              loading={isPending}
            />
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default memo(BlockSlotModal);
const getFormateTime = (time: string) =>
  `${time.split("_")[1]}:00 ${time.split("_")[2]}`;
