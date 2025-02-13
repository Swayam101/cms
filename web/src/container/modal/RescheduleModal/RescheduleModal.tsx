import { Box, Flex, Group, SimpleGrid } from "@mantine/core";
import classes from "./reschedule.module.scss";
import { useForm } from "@mantine/form";
import { memo, useEffect, useMemo, useState } from "react";
import FInput from "../../../ui/input/finput/FInput";
import FButton, { TButtonVariant } from "../../../ui/button/FButton";
import { IBookingList } from "../../../types";
import useGetTimeSlots from "../../../hooks/centre/useGetTimeSlots";
import FTypography from "../../../ui/typography/FTypography";
import moment from "moment";
import {
  handleSlotClick,
  isSlotSelected,
  Slot,
} from "../../../utils/slotSelectionLogic";
import { notifications, showNotification } from "@mantine/notifications";
import useRescheduleBooking from "../../../hooks/booking/useRescheduleBooking";
import { modals } from "@mantine/modals";
import { buttonCondition } from "../../../components/booking/calender/SlotSelectSection";
import PreviousSlots from "./PreviousSlots";
import { useGetCenterPriceQuery } from "../../../hooks/centre/useGetCentrePrice.query";
import { formatSlot } from "../../../utils/formatSlot.utils";
import FSelect from "../../../ui/input/f-select/FSelect";

interface IExtraData {
  isHoliday: boolean;
  noCourtAvailable: boolean;
  holidayName: string;
  courts: { id: string; name: string }[];
}

interface RescheduleModalProps {
  data: IBookingList;
}
interface Slots extends Slot {
  isSlotBlocked: boolean;
}
const RescheduleModal = ({ data }: RescheduleModalProps) => {
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const form = useForm({
    initialValues: {
      type: data.type ?? "",
      centre: data.centerId ?? "",
      date: moment(data.bookingDate).toDate() ?? "",
    },
  });

  useEffect(() => {
    setSelectedSlots([]);
  }, [form.values.date]);

  const { mutateAsync } = useRescheduleBooking();
  const { data: timeSlot } = useGetTimeSlots({
    bookingDate: form.values.date,
    centerId: form.values.centre,
    type: data.type,
  });

  const handleSubmit = async () => {
    if (selectedSlots.length !== data.slots.length) {
      notifications.show({
        message: `Please select ${data.slots.length}`,
        title: "Please select slots",
        color: "red",
      });
      return;
    }

    const courtNotAvailable = selectedSlots.filter((e) => !e.court);

    if (courtNotAvailable.length > 0) {
      showNotification({
        message: `Please select court for: ${courtNotAvailable
          .map((e) => `${e.id.split("_")[1]}:00 ${e.id.split("_")[2]}`)
          .join(", ")}`,
        color: "red",
      });
      return;
    }

    const res = await mutateAsync({
      data: {
        bookingId: data._id,
        bookingDate: form.values.date,
        centerId: form.values.centre,
        bookingSlots: selectedSlots.map((i) => ({
          slot: i.id,
          court: i.court?.id ?? "",
          courtName: i.court?.name ?? "",
        })),
        type: data.type,
      },
    });
    if (res.statusCode === 200) {
      notifications.show({
        message: res.message,
        title: res.title,
      });
    } else {
      notifications.show({
        message: res.message,
        title: res.title,
        color: "red",
      });
    }
    modals.closeAll();
  };

  const extraData = timeSlot?.extraData as IExtraData;

  const { data: priceData, isFetching } = useGetCenterPriceQuery({
    bookingDate: moment(form.values.date).format("YYYY-MM-DD"),
    centreId: form.values.centre,
    type: data.type,
  });

  const price = useMemo(() => {
    if (priceData?.data?.price) {
      return priceData.data.price * (data.slots?.length ?? 0);
    } else {
      return 0;
    }
  }, [priceData, data.slots]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex m="lg" gap="xs" direction="column" mt={0}>
        <SimpleGrid cols={2}>
          <FInput
            label=""
            variant="select"
            smallSelect
            data={[
              { label: "Court", value: "court" },
              { label: "Slot", value: "slot" },
            ]}
            placeholder="Select Type"
            disabled
            formHandler={{ value: data.type }}
          />
          <p className={classes.centerName}>{data.centerName}</p>
        </SimpleGrid>
        <Flex justify={"space-between"}>
          <Box flex={0.965}>
            <FInput
              variant="date"
              label=""
              placeholder="Select Date"
              formHandler={form.getInputProps("date")}
              isTodayDate={true}
            />
          </Box>
          <p className={classes.centerName}>
            Amount: <b>{data.amount}/-</b>
          </p>
        </Flex>
        <p className={`${classes.centerName} ${classes.rescheduled}`}>
          Rescheduled Amount: <b>{isFetching ? "----" : price + "/-"}</b>
        </p>
        <PreviousSlots
          slots={data.slots ?? []}
          bookingDate={data.bookingDate}
        />
        {!extraData?.isHoliday && !extraData?.noCourtAvailable ? (
          <SimpleGrid cols={1} spacing={"md"}>
            {timeSlot?.data.map((e: Slots & { bookedTurf: string[] }) => {
              const currentTime = moment();
              const slotTime = moment(
                `${moment(form.values.date).format("YYYY-MM-DD")} ${
                  e.id.split("_")[1]
                }:00 ${e.id.split("_")[2]}`,
                "YYYY-MM-DD hh:mm A"
              );
              const isExpired = slotTime.isBefore(currentTime);
              const buttonLabelVariant: {
                label: string;
                variant: TButtonVariant;
              } = (() => {
                if (e.isBooked) {
                  return { label: "Booked", variant: "booked" };
                } else if (e.isSlotBlocked) {
                  return { label: "Blocked", variant: "blocked" };
                } else if (isSlotSelected(e, selectedSlots)) {
                  return buttonCondition.selected();
                } else {
                  return buttonCondition.unselected();
                }
              })();
              return (
                <Box key={e.id}>
                  <Flex
                    justify={"space-around"}
                    align={"center"}
                    direction={"row"}
                  >
                    <FTypography
                      fontSize={14}
                      text={formatSlot(e.id)}
                      variant="nunito700"
                    />
                    <Box>
                      <FButton
                        label={`${buttonLabelVariant.label}`}
                        variant={`${buttonLabelVariant.variant}`}
                        disable={e.isBooked || e.isSlotBlocked || isExpired}
                        onClick={() =>
                          handleSlotClick(
                            e,
                            selectedSlots,
                            setSelectedSlots,
                            data
                          )
                        }
                      />
                    </Box>
                    <Select
                      e={e}
                      extraData={extraData}
                      selectedSlots={selectedSlots}
                      setSelectedSlots={setSelectedSlots}
                    />
                  </Flex>
                </Box>
              );
            })}
          </SimpleGrid>
        ) : (
          <Box p={"md"}>
            <FTypography
              fontSize={16}
              text={
                extraData?.isHoliday
                  ? `Selected day is a marked holiday: ${
                      extraData?.holidayName ?? "Holiday"
                    }`
                  : "No courts are available today."
              }
              variant="nunito700"
            />
          </Box>
        )}
        <Group mt="md" justify="end">
          <Flex gap="md" miw={"250px"}>
            <FButton
              variant="outline"
              onClick={() => modals.closeAll()}
              label="Cancel"
            />
            <FButton
              variant={
                selectedSlots.length !== data.slots.length
                  ? "disabled"
                  : "filled"
              }
              type="submit"
              label={"Update"}
              disable={selectedSlots.length !== data.slots.length}
            />
          </Flex>
        </Group>
      </Flex>
    </form>
  );
};

export default memo(RescheduleModal);

interface Props {
  selectedSlots: Slot[];
  e: Slots & {
    bookedTurf: string[];
  };
  extraData: IExtraData;
  setSelectedSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
}

const Select: React.FC<Props> = ({
  selectedSlots,
  e,
  extraData,
  setSelectedSlots,
}) => {
  return (
    <FSelect
      key={
        e.id + (selectedSlots.find((se) => se.id === e.id)?.court?.name ?? "")
      }
      value={selectedSlots.find((se) => se.id === e.id)?.court?.id ?? ""}
      placeholder="Please select court"
      data={
        extraData?.courts
          ?.filter((bCourt) => !e.bookedTurf.join(",").includes(bCourt.id))
          .map((court) => ({
            label: court.name,
            value: court.id,
          })) ?? []
      }
      disabled={!isSlotSelected(e, selectedSlots)}
      onChange={(court) => {
        setSelectedSlots((se) =>
          se.map((x) =>
            x.id === e.id
              ? {
                  ...x,
                  court: { id: court.value, name: court.label },
                }
              : x
          )
        );
      }}
    />
  );
};
