import { adminApis } from "./admin.api";
import { authApis } from "./admin.auth.api";
import { usersApis } from "./user.api";

import dashboardApi from "./dashboard.api";

export const API_URLS = {
  AUTH_ADMIN: authApis,
  USERS: usersApis,
  ADMIN: adminApis,
  DASHBOARD: dashboardApi,
};
