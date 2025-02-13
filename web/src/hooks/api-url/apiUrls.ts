import { adminApis } from "./admin.api";
import { authApis } from "./admin.auth.api";
import { usersApis } from "./user.api";
import { holidayApis } from "./holiday.api";
import adminCentreApis from "./admin.centre.api";
import adminCourtApi from "./admin.court.api";
import { bookingApis } from "./admin.booking";
import dashboardApi from "./dashboard.api";
import { academyApi } from "./admin.academy.api";
import adminReportApi from "./admin.report.api";

export const API_URLS = {
  AUTH_ADMIN: authApis,
  USERS: usersApis,
  ADMIN: adminApis,
  HOLIDAY: holidayApis,
  ADMIN_CENTRE: adminCentreApis,
  ADMIN_COURT: adminCourtApi,
  BOOKINGS: bookingApis,
  ADMIN_BOOKING: bookingApis,
  DASHBOARD: dashboardApi,
  ACADEMY: academyApi,
  REPORTS: adminReportApi,
};
