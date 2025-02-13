import { memo, useMemo } from "react";
import { IBookingList } from "../../types";
import { confirmationAlert, Modals } from "../../container/modal/Fmodals";
import RescheduleModal from "../../container/modal/RescheduleModal/RescheduleModal";
import { Button, Tooltip } from "@mantine/core";
import { IconCalendarClock, IconX } from "@tabler/icons-react";
import { COLORS } from "../../assets/colors";
import { checkPriorBookingForAction } from "../../utils/checkPriorBookingForAction";
import CancelBookingModal from "../../container/modal/CancelBookingModal/CancelBookingModal";

const ListBookingActionBar = ({ data }: { data: IBookingList }) => {
  const handleReschedule = () => {
    Modals({
      title: "Rescheduling",
      children: <RescheduleModal data={data} />,
    });
  };
  const handleCancel = async () => {
    const confirm = await confirmationAlert({
      title: "Confirm Deleting",
      labels: { cancel: "Cancel", confirm: "Confirm" },
      msg: "Are you sure you want to delete the booking?",
    });
    if (!confirm) {
      return;
    }
    Modals({
      title: "Cancel Booking",
      children: <CancelBookingModal _id={data._id} />,
      centered: true,
      size: "md",
    });
  };

  const disabled = useMemo(() => {
    if (data.isReschedule || data.status !== "approved") {
      return true;
    }

    return checkPriorBookingForAction({
      slots: data.slots,
      bookingDate: data.bookingDate,
    });
  }, [data.isReschedule, data.slots, data.bookingDate, data.status]);

  return (
    <div>
      <Button.Group>
        <Tooltip label="Re-schedule Booking" disabled={disabled}>
          <Button
            disabled={disabled}
            variant="default"
            color="blue"
            onClick={() => handleReschedule()}
            size="compact-md"
          >
            <IconCalendarClock size={18} />
          </Button>
        </Tooltip>
        <Tooltip label={"Cancel Booking"} disabled={disabled}>
          <Button
            disabled={disabled}
            variant="default"
            color="red"
            onClick={() => handleCancel()}
            size="compact-md"
          >
            <IconX size={18} color={disabled ? undefined : COLORS.red} />
          </Button>
        </Tooltip>
      </Button.Group>
    </div>
  );
};

export default memo(ListBookingActionBar);
