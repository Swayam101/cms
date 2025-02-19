import { Box } from "@mantine/core";
import React, { memo, useState } from "react";
import FTypography from "../../ui/typography/FTypography";
import classes from "./index.module.scss";

import { DatePickerInput } from "@mantine/dates";

const DashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  return (
    <Box className={classes.root}>
      <Box>
        <FTypography text="Dashboard" fontSize={"24px"} variant="oswald500" />
      </Box>
      <DatePickerInput
        type="range"
        label="Select a date range"
        placeholder="Pick dates range eg. 11 Oct 2024 - 15 Oct 2024"
        clearable
        size="sm"
        classNames={{
          input: classes.dateInput,
          label: classes.dateLabel,
          root: classes.rootInput,
        }}
        value={dateRange}
        onChange={setDateRange}
      />
    </Box>
  );
};

export default memo(DashboardPage);
