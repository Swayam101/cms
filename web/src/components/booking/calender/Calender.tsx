import React, { memo } from "react";
import moment, { Moment } from "moment";
import classes from "./calender.module.scss";
import Left from "../../../assets/icons/left";
import Right from "../../../assets/icons/right";
import { Box, Tooltip } from "@mantine/core";
import HolidayModal from "../../../container/modal/HolidayModal/HolidayModal";
import { Modals } from "../../../container/modal/Fmodals";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { IServerResponse } from "../../../interfaces/serverResponse.interface";
import Pencil from "../../../assets/icons/pencil";
import { capitalizeWords } from "../../../utils/capitalize";

type Holiday = {
  _id: string;
  date: Moment;
  name: string;
  category?: string;
};

interface CalendarProps {
  holidays: Holiday[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IServerResponse, Error>>;
  selectedDate: moment.Moment | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  currentMonth: moment.Moment;
  setCurrentMonth: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

const Calendar: React.FC<CalendarProps> = ({
  holidays,
  refetch,
  selectedDate,
  setSelectedDate,
  currentMonth,
  setCurrentMonth,
}) => {
  const startOfMonth = currentMonth.clone().startOf("month");

  const startCalendar = startOfMonth.clone().startOf("isoWeek");
  const endCalendar = startCalendar.clone().add(6, "weeks");

  const days = [];
  let day = startCalendar.clone();

  while (day.isBefore(endCalendar, "day")) {
    days.push(day.clone());
    day.add(1, "day");
  }

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  };

  const handleHoliday = (day: moment.Moment, edit: boolean, id?: string) => {
    Modals({
      children: (
        <HolidayModal
          date={day?.toDate() ?? new Date()}
          refetch={refetch}
          edit={edit}
          id={id}
        />
      ),
      title: `${edit ? "Edit" : "Add New"} Holiday`,
    });
  };
  const handleDayClick = (day: Moment, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) {
      setCurrentMonth(day.clone());
    }
    setSelectedDate(day);
  };
  return (
    <div className={classes.calendarContainer}>
      <div className={classes.calendarHeader}>
        <div className={classes.arrow}>
          <Left onClick={handlePrevMonth} />
        </div>
        <span>{currentMonth.format("MMMM YYYY")}</span>
        <div className={classes.arrow}>
          <Right onClick={handleNextMonth} />
        </div>
      </div>
      <div className={classes.weekdays}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className={classes.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={classes.calendarGrid}>
        {days.map((day, index) => {
          const isCurrentMonth = day.isSame(currentMonth, "month");
          const isSelected = selectedDate && day.isSame(selectedDate, "day");
          const holiday = holidays?.find((holiday) =>
            holiday.date.isSame(day, "day")
          );

          return (
            <Box
              key={index + "-"}
              className={`${classes.days} ${
                !isCurrentMonth ? classes.prevNext : classes.currentMonth
              } ${holiday ? classes.holiday : ""} ${
                isSelected ? classes.selected : ""
              }`}
              onClick={() => handleDayClick(day, isCurrentMonth)}
            >
              <Tooltip label={`${holiday ? "Edit" : "Add"} Holiday`}>
                <div className={classes.pencil}>
                  <Pencil
                    black
                    onClick={() => {
                      handleHoliday(day, !!holiday, holiday?._id);
                    }}
                  />
                </div>
              </Tooltip>
              <div className={classes.day}>{day.format("D")}</div>
              {holiday && (
                <div
                  className={`${classes.holidayTag} ${
                    classes[holiday.category?.replace(" ", "") ?? "default"]
                  }`}
                >
                  <Tooltip label={capitalizeWords(holiday.name)}>
                    <p>{holiday.name}</p>
                  </Tooltip>
                </div>
              )}
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Calendar);
