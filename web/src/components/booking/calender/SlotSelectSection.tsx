import React, { Fragment, memo, useEffect, useMemo, useState } from "react";
import classes from "./index.module.scss";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Loader,
  Pill,
  Popover,
  Tooltip,
} from "@mantine/core";
import FTypography from "../../../ui/typography/FTypography";
import FButton, { TButtonVariant } from "../../../ui/button/FButton";
import useGetTimeSlots from "../../../hooks/centre/useGetTimeSlots";
import { ISlotType } from "../../../initial-values/slot.intialValues";
import {
  getStartAndEndTime,
  handleSlotClick,
  isSlotSelected,
  Slot,
} from "../../../utils/slotSelectionLogic";
import BookingModal from "../../../container/modal/BookingModal/BookingModal";
import { Modals } from "../../../container/modal/Fmodals";
import { IServerResponse } from "../../../interfaces/serverResponse.interface";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useAppSelector } from "../../../app/hooks";
import moment from "moment";
import BlockSlotModal from "../../../container/modal/BlockSlotModal/BlockSlotModal";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../enum/routes.enum";
import { IconBook, IconLock } from "@tabler/icons-react";
import Eye from "../../../assets/icons/eye";
import { useDisclosure } from "@mantine/hooks";
import FSelect from "../../../ui/input/f-select/FSelect";
import { showNotification } from "@mantine/notifications";
import { formatSlot } from "../../../utils/formatSlot.utils";

interface ISlots {
  data: any;
  extraData?: {
    isHoliday?: boolean;
    holidayName?: string;
    noCourtAvailable?: boolean;
    courts: { id: string; name: string }[];
  };
}

interface ISlotSelectSection {
  selectedDate: moment.Moment;
  values: ISlotType;
  centreName?: any;
}

const SlotSelectSection: React.FC<ISlotSelectSection> = ({
  selectedDate,
  values,
  centreName,
}) => {
  const { role } = useAppSelector((state) => state.userData.userData);
  const navigate = useNavigate();

  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  useEffect(() => {
    setSelectedSlots([]);
  }, [selectedDate]);

  const { data, isPending, refetch } = useGetTimeSlots({
    bookingDate: new Date(selectedDate.toDate()),
    centerId: values?.centre ?? "",
    type: values?.type ?? "",
  });

  const slots = useMemo(() => {
    if (data) {
      return { data: data.data, extraData: data.extraData } as ISlots;
    }
  }, [data]);

  const handleAddBooking = () => {
    const courtNotAvailable = selectedSlots.filter((data) => !data.court);

    if (courtNotAvailable.length > 0) {
      showNotification({
        message: `Please select court for: ${courtNotAvailable
          .map((e) => `${e.id.split("_")[1]}:00 ${e.id.split("_")[2]}`)
          .join(", ")}`,
        color: "red",
      });
      return;
    }
    const { startTime, endTime } = getStartAndEndTime(selectedSlots);
    Modals({
      children: (
        <BookingModal
          data={{ endTime, startTime, slotDate: selectedDate.toDate() }}
          centerId={values.centre}
          type={values.type}
          slots={selectedSlots}
          refetch={refetch}
          setSelectedSlots={setSelectedSlots}
        />
      ),
      title: "Add New Booking",
    });
  };
  const handleBlock = () => {
    const { startTime, endTime } = getStartAndEndTime(selectedSlots);
    Modals({
      children: (
        <BlockSlotModal
          data={{
            endTime,
            startTime,
            bookingDate: selectedDate.toDate(),
            centerId: values.centre,
          }}
          slots={selectedSlots}
          refetch={refetch}
          setSelectedSlots={setSelectedSlots}
        />
      ),
      title: "Bulk Booking",
    });
  };

  const handleEditBooking = () => {
    const params = new URLSearchParams();
    params.set("date", selectedDate.toDate().toString());
    params.set("centre", values.centre);
    params.set("name", centreName.name ?? "");
    navigate(`${ROUTES.EDIT_BLOCKED}${params.toString()}`);
  };

  return (
    <Box className={classes.slotroot}>
      <Box className={classes.slotHeader}>
        <FTypography fontSize={20} text="Select Slot" variant="nunito700" />

        {/* <Button.Group>
          <Tooltip label="View Blocked Slots" disabled={!values.centre}>
            <Button
              disabled={!values.centre}
              variant="default"
              color="blue"
              onClick={() => handleEditBooking()}
              size="compact-md"
            >
              <Eye />
            </Button>
          </Tooltip>
          <Tooltip label="Book" disabled={selectedSlots.length === 0}>
            <Button
              disabled={selectedSlots.length === 0}
              variant="default"
              color="blue"
              onClick={() => handleAddBooking()}
              size="compact-md"
            >
              <IconBook size={20} />
            </Button>
          </Tooltip>
          <Tooltip label="Block" disabled={selectedSlots.length === 0}>
            <Button
              disabled={selectedSlots.length === 0}
              variant="default"
              color="blue"
              onClick={() => handleBlock()}
              size="compact-md"
            >
              <IconLock size={20} />
            </Button>
          </Tooltip>
        </Button.Group> */}
      </Box>
      <Box className={classes.margin}>
        <Box className={classes.dateBlock}>
          Selected Date: {selectedDate.format("DD-MMM-yyyy")}
        </Box>
        <Divider size="sm" />
      </Box>
      {conditions({
        isPending,
        values,
        selectedSlots,
        setSelectedSlots,
        selectedDate,
        refetch,
        role,
        data: slots,
      })}
    </Box>
  );
};

export default memo(SlotSelectSection);

const conditions = ({
  isPending,
  selectedDate,
  selectedSlots,
  setSelectedSlots,
  values,
  data,
  role,
}: {
  isPending: boolean;
  values: ISlotType;
  selectedSlots: Slot[];
  setSelectedSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
  selectedDate: moment.Moment;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IServerResponse, Error>>;
  role?: string;
  data?: ISlots;
}) => {
  if (data?.extraData?.isHoliday) {
    return (
      <Box className={classes.padding}>
        <FTypography
          fontSize={16}
          text="Today is Holiday"
          variant="nunito700"
        />
      </Box>
    );
  } else if (data?.extraData?.noCourtAvailable) {
    return (
      <Box className={classes.padding}>
        <FTypography
          fontSize={16}
          text="No Court Available"
          variant="nunito700"
        />
      </Box>
    );
  } else if (data?.data.length === 0) {
    return (
      <Box className={classes.padding}>
        <FTypography
          fontSize={16}
          text="No Slots Available"
          variant="nunito700"
        />
      </Box>
    );
  } else if (data?.data) {
    return data?.data.map(
      (e: {
        id: string;
        time: string;
        isBooked: boolean;
        isSlotBlocked: boolean;
        availableCourtsCount: number;
        blockedCourts: number;
        courtsBooked: number;
        slotsBooked: number;
        isSlotAvailable: boolean;
        bookedTurf: string[];
      }) => {
        return (
          <Fragment key={e.id}>
            <Flex
              align={"center"}
              gap={10}
              className={classes.slotSelectSection}
              mb={8}
            >
              <FTypography
                fontSize={14}
                text={formatSlot(e.id)}
                variant="nunito700"
              />
              <CourtsPopOverButton
                e={{ ...e }}
                values={values}
                selectedDate={selectedDate}
                selectedSlots={selectedSlots}
                setSelectedSlots={setSelectedSlots}
              />
            </Flex>
            {isSlotSelected(e, selectedSlots) && (
              <FSelect
                placeholder="Please Select Court"
                data={
                  data.extraData?.courts
                    .filter(
                      (court) => !e.bookedTurf.join(",").includes(court.id)
                    )
                    .map((court) => ({
                      label: court.name,
                      value: court.id,
                    })) ?? []
                }
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
            )}
            <Divider size="sm" mt={12} />
          </Fragment>
        );
      }
    );
  } else if (isPending && values.centre !== "" && values.type !== "") {
    return (
      <Flex justify={"center"} mt={24}>
        <Loader />
      </Flex>
    );
  } else {
    return (
      <Box className={classes.padding}>
        <FTypography
          fontSize={16}
          text={`Please Select Type ${
            role !== "centre-manager" ? "and Centre" : ""
          }`}
          variant="nunito700"
        />
      </Box>
    );
  }
};

export const buttonCondition = {
  selected: (): { label: string; variant: TButtonVariant } => ({
    label: "Selected",
    variant: "selected",
  }),
  unselected: (): { label: string; variant: TButtonVariant } => ({
    label: "Select",
    variant: "select",
  }),
};

interface IProps {
  selectedSlots: Slot[];
  setSelectedSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
  e: {
    id: string;
    time: string;
    isBooked: boolean;
    isSlotBlocked: boolean;
    availableCourtsCount: number;
    blockedCourts: number;
    courtsBooked: number;
    slotsBooked: number;
    isSlotAvailable: boolean;
  };
  selectedDate: moment.Moment;
  values: ISlotType;
}

const getPopoverConfig = (e: IProps["e"], type: ISlotType["type"]) => {
  const config = [
    {
      label: "Available Courts",
      count: e.availableCourtsCount,
      style: { root: classes.availablePill },
    },
    {
      label: "Blocked Courts",
      count: e.blockedCourts,
      style: { root: classes.blockedPill },
    },
  ];
  if (type === "slot")
    config.push({
      label: "Booked Slots",
      count: e.slotsBooked,
      style: { root: classes.bookedPill },
    });
  else {
    config.push({
      label: "Booked Courts",
      count: e.courtsBooked,
      style: { root: classes.bookedPill },
    });
  }
  return config;
};

const CourtsPopOverButton: React.FC<IProps> = ({
  selectedSlots,
  setSelectedSlots,
  selectedDate,
  values,
  e,
}) => {
  const [opened, { open, close }] = useDisclosure();

  const slotTime = moment(
    `${selectedDate.format("YYYY-MM-DD")} ${e.id.split("_")[1]}:00 ${
      e.id.split("_")[2]
    }`,
    "YYYY-MM-DD hh:mm A"
  );

  const currentTime = moment();

  const buttonLabelVariant: {
    label: string;
    variant: TButtonVariant;
  } = (() => {
    if ((e.isSlotBlocked || e.isBooked) && !e.isSlotAvailable) {
      return { label: "Occupied", variant: "blocked" };
    } else if (isSlotSelected(e, selectedSlots)) {
      return buttonCondition.selected();
    } else {
      return buttonCondition.unselected();
    }
  })();

  const isExpired = slotTime.isBefore(currentTime);

  return (
    <Popover
      width={250}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <Box
          onMouseOver={open}
          onMouseOut={close}
          className={classes.slotInnerBtn}
        >
          <FButton
            label={`${buttonLabelVariant.label}`}
            variant={`${buttonLabelVariant.variant}`}
            onClick={() => handleSlotClick(e, selectedSlots, setSelectedSlots)}
            disable={
              ((e.isSlotBlocked || e.isBooked) && !e.isSlotAvailable) ||
              isExpired
            }
          />
        </Box>
      </Popover.Target>
      <Popover.Dropdown>
        <Flex direction={"column"} gap={8}>
          {getPopoverConfig(e, values.type).map(
            ({ label, count, style }, index) => {
              return (
                <Flex key={"slot data " + index} justify={"space-between"}>
                  <Pill classNames={style} size={"md"}>
                    {label}
                  </Pill>
                  <Avatar
                    size={"sm"}
                    classNames={{ placeholder: classes.avatarPlaceHolder }}
                  >
                    {count.toString()}
                  </Avatar>
                </Flex>
              );
            }
          )}
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};
