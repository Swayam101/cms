import { prefix } from "./admin.auth.api";

export default {
  GET_CENTRES: prefix + "/centers",
  GET_ALL_CENTRES: prefix + "/centres/get",
  GET_CENTRE_BY_ID: prefix + `/center`,
  CREATE_CENTRE: prefix + "/center/create",
  UPDATE_CENTRE: prefix + "/center/update",
  DELETE_CENTRE: prefix + "/center/delete",
  CHANGE_STATUS: prefix + "/center/update-status",
  CENTRE_SEARCH: prefix + "/center/search",
  GET_SLOTS: prefix + "/centre/get-time-slots",
  UPDATE_PRICING: prefix + "/center/update-pricing",
  CUSTOM_PRICING: prefix + "/custom-pricing/center",
  CUSTOM_PRICE_BY_ID: prefix + "/custom-pricing/find",
  CUSTOM_PRICING_ADD: prefix + "/custom-pricing",
  CUSTOM_PRICING_DELETE: prefix + "/custom-pricing",
  GET_CENTRE_PRICE: prefix + "/centre/get-center-price",
};
