import UserModal from "../../container/modal/UserModal/UserModal";
import { useDeleteAdmin } from "../../hooks/admin/useDeleteAdmin";
import { useGetAllUploadLogs } from "../../hooks/admin/useGetAllUploadLogs";
import { useUpdateAdminStatus } from "../../hooks/admin/useUpdateAdminStatus";
import useDeleteCentre from "../../hooks/centre/useDeleteCentre";
import useGetCentres from "../../hooks/centre/useGetCentres";
import useUpdateCentreStatus from "../../hooks/centre/useUpdateCentreStatus";
import { useGetAllUser } from "../../hooks/users/useGetAllUsers";
import { useUpdateUserStatus } from "../../hooks/users/useUpdateUserStatus";

export const actionBarEntities = {
  centre: {
    editModal: (centreId: string) => (
      <UserModal isCreateModal={false} id={centreId} />
    ),
    deleteMutation: useDeleteCentre,
    refetch: useGetCentres,
    changeStatusMutation: useUpdateCentreStatus,
  },
  admin: {
    changeStatusMutation: useUpdateAdminStatus,
    editModal: null,
    refetch: useGetAllUploadLogs,
    deleteMutation: useDeleteAdmin,
  },
  user: {
    changeStatusMutation: useUpdateUserStatus,
    refetch: useGetAllUser,
    deleteMutation: null,
    editModal: (centreId: string) => (
      <UserModal isCreateModal={false} id={centreId} />
    ),
  },
};
