import { useForm } from "@mantine/form";
import React, { memo } from "react";
import FInput from "../../../ui/input/finput/FInput";
import { Flex } from "@mantine/core";
import FButton from "../../../ui/button/FButton";
import { modals } from "@mantine/modals";
import { bookingCancelResolver } from "../../../validations/bookingCancel.validation";
import { useCancelBookingMutation } from "../../../hooks/booking/useCancelBooking.mutation";
import { queryClient } from "../../../client/queryClient";
import { showNotification } from "@mantine/notifications";

interface IProps {
  _id: string;
}

const CancelBookingModal: React.FC<IProps> = ({ _id }) => {
  const { onSubmit, getInputProps, reset } = useForm({
    initialValues: { note: "" },
    validate: bookingCancelResolver,
  });
  const { isPending, mutateAsync } = useCancelBookingMutation();
  const handleSubmit = async (data: { note: string }) => {
    const res = await mutateAsync({ _id, note: data.note });
    if (res.status === "success") {
      queryClient.invalidateQueries({ queryKey: ["booking", "all"] });
      modals.closeAll();
      reset();
      showNotification({
        message: res.message,
        title: res.title,
        color: "green",
      });
    } else {
      showNotification({
        message: res.message,
        title: res.title,
        color: "red",
      });
    }
  };
  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <FInput
        label="Note"
        variant="text"
        placeholder="Please cancel note."
        formHandler={getInputProps("note")}
      />
      <Flex justify={"flex-end"} mt={24}>
        <Flex gap="md" justify={"flex-end"} w={"100%"}>
          <FButton
            variant="outline"
            onClick={() => {
              reset();
              modals.closeAll();
            }}
            label="Close"
          />
          <FButton
            variant="filled"
            type="submit"
            label={"Cancel Booking"}
            loading={isPending}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default memo(CancelBookingModal);
