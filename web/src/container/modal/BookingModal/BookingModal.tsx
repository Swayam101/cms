import { Flex, SimpleGrid, Table } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { memo } from "react";
import FInput from "../../../ui/input/finput/FInput";
import FButton from "../../../ui/button/FButton";
import { IBookingForm } from "../../../types";
import { bookingValidation } from "../../../validations/booking.validation";
import { getBookingInitialValues } from "../../../initial-values/booking.initialValues";
import useAddBooking from "../../../hooks/booking/useAddBooking";
import { Slot } from "../../../utils/slotSelectionLogic";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { IServerResponse } from "../../../interfaces/serverResponse.interface";
import { formatSlot } from "../../../utils/formatSlot.utils";

interface BookingModalProps {
  data: IBookingForm;
  centerId: string;
  type: string;
  slots: Slot[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IServerResponse, Error>>;
  setSelectedSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
}

const BookingModal = ({
  data,
  centerId,
  type,
  slots,
  refetch,
  setSelectedSlots,
}: BookingModalProps) => {
  const { mutateAsync, isPending } = useAddBooking();
  const form = useForm<IBookingForm>({
    initialValues: getBookingInitialValues({ ...data, slots }),
    validate: yupResolver(bookingValidation),
  });
  const handleSubmit = (values: IBookingForm) => {
    addBookingMutation(values);
  };

  const addBookingMutation = async (values: IBookingForm) => {
    const res = await mutateAsync({
      data: {
        bookingDate: values.slotDate ?? "",
        name: values.playerName ?? "",
        mobile: values.phoneNumber ?? "",
        centerId: centerId,
        type: type,
        bookingSlots: slots.map((slot) => ({
          slot: slot.id,
          court: slot.court?.id ?? "",
          courtName: slot.court?.name ?? "",
        })),
        paymentType: values.paymentType ?? "",
      },
    });
    if (res.status === "error") {
      modals.closeAll();
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
          formHandler={form.getInputProps("slotDate")}
          disabled
        />
        <SimpleGrid cols={1}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Court</Table.Th>
                <Table.Th>Slot</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {slots.map((e) => {
                return (
                  <Table.Tr key={e.id}>
                    <Table.Td>{e.court?.name}</Table.Td>
                    <Table.Td>{formatSlot(e.id)}</Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </SimpleGrid>
        <FInput
          label="Player name"
          placeholder="Player name"
          variant="text"
          formHandler={form.getInputProps("playerName")}
        />
        <FInput
          label="Phone No."
          placeholder="Phone No."
          variant="number"
          formHandler={form.getInputProps("phoneNumber")}
        />
        <FInput
          label="Payment type"
          placeholder="Select payment type"
          variant="select"
          formHandler={form.getInputProps("paymentType")}
          data={["UPI", "Card"]}
        />
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
              label={"Add Booking"}
              loading={isPending}
            />
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default memo(BookingModal);
