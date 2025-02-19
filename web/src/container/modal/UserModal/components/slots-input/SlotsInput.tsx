import React, { memo, useMemo } from "react";
import classes from "./index.module.scss";
import { Checkbox, Group, MultiSelect } from "@mantine/core";
import weeksData from "./weeks.data";
import { ICentreForm } from "../../../../../types";
import { UseFormReturnType } from "@mantine/form";
import createTimeSlotsUtils from "../../../../../utils/createTimeSlots.utils";
import { getSlotDuration } from "../../../../../utils/slotSelectionLogic";

interface Props {
  form: UseFormReturnType<ICentreForm, (values: ICentreForm) => ICentreForm>;
}

const SlotsInput: React.FC<Props> = ({ form }) => {
  const { openTime, closeTime } = form.values;
  const slots = useMemo(() => {
    if (openTime && closeTime) {
      const timeSlots = createTimeSlotsUtils(openTime, closeTime);
      form.setFieldValue("slots", timeSlots);

      form.setFieldValue("openPlaySlots", []);
      return timeSlots.map((e) => ({ value: e, label: getSlotDuration([e]) }));
    }
    return [];
  }, [openTime, closeTime]);

  return (
    <>
      <div>
        <p className={classes.title}>Open Play In-Active Weeks</p>

        <Checkbox.Group
          withAsterisk
          {...form.getInputProps("inActiveWeekOpenPlay")}
        >
          <Group mt="xs">
            {weeksData.map((e) => (
              <Checkbox key={e.value} {...e} />
            ))}
          </Group>
        </Checkbox.Group>
      </div>
      <div>
        <p className={classes.title}>Select Open Play Slots</p>
        <MultiSelect
          placeholder="Select open play slots"
          data={slots}
          {...form.getInputProps("openPlaySlots")}
        />
      </div>
    </>
  );
};

export default memo(SlotsInput);
