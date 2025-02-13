import checkAdminAccessMiddleware from "./checkAdminAccess.middleware";
import checkUserAccessMiddleware from "./checkUserAccess.middleware";

export default {
  checkAdminAccess: checkAdminAccessMiddleware,
  checkUserAccess: checkUserAccessMiddleware,
};
