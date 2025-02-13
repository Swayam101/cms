import { Box, Loader } from "@mantine/core";
import React, { memo, useState } from "react";
import FTypography from "../../ui/typography/FTypography";
import StatCard from "../stat-card/StatCard";
import classes from "./index.module.scss";
import useGetDashboard from "../../hooks/dashboard/useGetDashboard";
import { numberFormatter } from "../../utils/numberFormate";
import { useAppSelector } from "../../app/hooks";
import { ADMIN_ROLES } from "../../enum/admin.enum";
import { Link } from "react-router-dom";
import ROUTES from "../../enum/routes.enum";
import { DatePickerInput } from "@mantine/dates";

const DashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const { data: dashboardData, isLoading } = useGetDashboard({ dateRange });
  const { role } = useAppSelector((state) => state.userData.userData);
  const isCenterManger = ADMIN_ROLES.CENTRE_MANAGER !== role;
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
      <Box className={classes.cardRoot}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isCenterManger && (
              <Link
                to={ROUTES.USER_TABLE_PAGE}
                style={{ color: "transparent" }}
              >
                <StatCard
                  data={numberFormatter(dashboardData?.data?.totalUsers)}
                  icon="group"
                  text="Total User"
                  imgAlt="Total User"
                  variant="cream"
                />
              </Link>
            )}
            <Link to={ROUTES.LIST_BOOKING} style={{ color: "transparent" }}>
              <StatCard
                data={numberFormatter(dashboardData?.data?.totalSales)}
                icon="stats"
                text={isCenterManger ? "Total Sales" : "Center Sales"}
                imgAlt="Total Sales"
                variant="cream"
              />
            </Link>
            <Link to={ROUTES.LIST_BOOKING} style={{ color: "transparent" }}>
              <StatCard
                data={numberFormatter(dashboardData?.data?.totalBooking)}
                icon="timer"
                text="Total Booking"
                imgAlt="Total Booking"
                variant="cream"
              />
            </Link>
            {isCenterManger && (
              <Link
                to={ROUTES.USER_TABLE_PAGE}
                style={{ color: "transparent" }}
              >
                <StatCard
                  data={numberFormatter(dashboardData?.data?.newUsers)}
                  icon="group"
                  text="New User"
                  imgAlt="New User"
                  variant="white"
                />
              </Link>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default memo(DashboardPage);
