import React, { memo, useMemo, useState } from "react";
import classes from "./index.module.scss";
import { Box, Text } from "@mantine/core";
import FInput from "../../../ui/input/finput/FInput";
import SlotSelectSection from "./SlotSelectSection";
import Calendar from "./Calender";
import moment, { Moment } from "moment";
import { useGetHolidays } from "../../../hooks/holiday/useGetHoliday";
import { useForm } from "@mantine/form";
import { slotInitialValues } from "../../../initial-values/slot.intialValues";
import { useAppSelector } from "../../../app/hooks";
import { ADMIN_ROLES } from "../../../enum/admin.enum";
import FButton from "../../../ui/button/FButton";
import CenterSearchSelect from "../../../container/center-search-select/CenterSearchSelect";

const CalenderPage: React.FC = () => {
  const [centerName, setCenterName] = useState("");
  const { role, centre, centreName } = useAppSelector(
    (state) => state.userData.userData
  );
  const isCenterManger = ADMIN_ROLES.CENTRE_MANAGER === role;

  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const [currentMonth, setCurrentMonth] = useState(moment());

  const { data, refetch } = useGetHolidays();
  const form = useForm({
    initialValues: {
      ...slotInitialValues,
      centre: isCenterManger ? centre ?? "" : "",
    },
  });

  const holidays = useMemo(() => {
    if (data?.data) {
      return data?.data?.map(
        ({
          _id,
          category,
          name,
          date,
        }: {
          _id: string;
          category?: string;
          name: string;
          date: Date;
        }) => ({
          _id,
          category,
          name,
          date: moment(date),
        })
      );
    }
  }, [data]);
  const handleTodayClick = () => {
    const today = moment();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.headerBlock}>
        <FInput
          label=""
          variant="select"
          smallSelect
          data={[
            { label: "Court", value: "court" },
            { label: "Slot", value: "slot" },
          ]}
          placeholder="Select Type"
          formHandler={form.getInputProps("type")}
        />

        {!isCenterManger ? (
          <Box w={256}>
            <CenterSearchSelect
              onChange={(e) => {
                form.setFieldValue("centre", e.value);
                setCenterName(e.label);
              }}
              value={form.values.centre ?? ""}
            />
          </Box>
        ) : (
          <Text className={classes.centerName}>
            <b>Centre:</b> {centreName}
          </Text>
        )}
      </Box>
      <Box className={classes.innerbox}>
        <SlotSelectSection
          selectedDate={selectedDate ?? moment()}
          values={form.values}
          centreName={centerName}
        />
        <Box className={classes.calenderbox}>
          <Calendar
            holidays={holidays}
            refetch={refetch}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
          <Box className={classes.todayBtn}>
            <FButton
              label="Today"
              variant="select"
              onClick={handleTodayClick}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(CalenderPage);
