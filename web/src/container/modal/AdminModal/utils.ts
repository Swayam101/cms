import { ADMIN_ROLES } from "../../../enum/admin.enum";

export const getRoleOptionsByRole = (role: ADMIN_ROLES) => {
  const allEntries = Object.entries(ADMIN_ROLES).map(([_, value]) => value);
  if (role === ADMIN_ROLES.OWNER) return allEntries;
  else return allEntries.filter((val) => val !== ADMIN_ROLES.OWNER);
};
