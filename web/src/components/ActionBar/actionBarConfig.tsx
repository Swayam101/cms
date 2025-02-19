import CustomerModal from "../../container/modal/CustomerModal/CustomerModal";
import UserModal from "../../container/modal/UserModal/UserModal";
import { useUpdateAdminStatus } from "../../hooks/admin/useUpdateAdminStatus";

import { useUpdateUserStatus } from "../../hooks/users/useUpdateUserStatus";

export const actionBarEntities = {
  centre: {
    editModal: (centreId: string) => (
      <UserModal isCreateModal={false} id={centreId} />
    ),
    deleteMutation: null,
    changeStatusMutation: null,
  },
  admin: {
    changeStatusMutation: useUpdateAdminStatus,
    editModal: (id: string) => {
      return <CustomerModal id={id} isCreateModal={false} />;
    },
    deleteMutation: null,
  },
  user: {
    changeStatusMutation: useUpdateUserStatus,
    deleteMutation: null,
    editModal: (centreId: string) => (
      <UserModal isCreateModal={false} id={centreId} />
    ),
  },
};
