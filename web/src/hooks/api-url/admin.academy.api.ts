import { prefix } from "./admin.auth.api";

export const academyApi = {
  GET_ACADEMY_LIST: prefix + "/academy/list/all",
  GET_ACADEMY_LIST_BY_ID: prefix + "/academy/list-by-id",
  POST_ACADEMY_LIST_ADD: prefix + "/academy/list/add",
  POST_ACADEMY_LIST_UPDATE: prefix + "/academy/list/update",
  POST_ACADEMY_LIST_STATUS: prefix + "/academy/list/status",
  GET_ACADEMY_PLAN: prefix + "/academy/all-plan",
  GET_ACADEMY_PLAN_BY_ID: prefix + "/academy/plan-by-id",
  POST_ACADEMY_PLAN_ADD: prefix + "/academy/add-plan",
  POST_ACADEMY_PLAN_UPDATE: prefix + "/academy/update",
  POST_ACADEMY_PLAN_STATUS: prefix + "/academy/status",
};
