import { Button, Tooltip } from "@mantine/core";
import React from "react";
import Eye from "../../assets/icons/eye";
import EyeDisable from "../../assets/icons/eyedisable";
import Delete from "../../assets/icons/delete";
import { modals } from "@mantine/modals";
import useChangeCourtStatus from "../../hooks/court/useChangeCourtStatus";
import { confirmationAlert, Modals } from "../../container/modal/Fmodals";
import { notifications } from "@mantine/notifications";
import { queryClient } from "../../client/queryClient";
import CourtModal from "../../container/modal/CustomerModal/CustomerModal";
import useDeleteCourt from "../../hooks/court/useDeleteCourt";
import Edit from "../../assets/icons/edit";

interface IProps {
  status: boolean;
  id: string;
}

const CustomerActionBar: React.FC<IProps> = ({ status, id }) => {
  const { mutateAsync: changeStatusMutate, isPending: isStatusPending } =
    useChangeCourtStatus();
  const { mutateAsync: deleteCourtMutate, isPending: isDeletePending } =
    useDeleteCourt();

  const handleDelete = async () => {
    const isConfirm = await confirmationAlert({
      labels: { cancel: "Cancel", confirm: "Confirm" },
      msg: `Are you sure you wnat to delete this court?`,
    });

    if (isConfirm) {
      const response = await deleteCourtMutate({ id });
      notifications.show({
        message: response.message,
        title: response.title,
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["court", "court_fetch"] });
    }
  };

  const handleOpenEditModal = () => {
    Modals({
      children: <CourtModal isCreateModal={false} id={id} />,
      title: `Edit Court`,
      size: "sm",
    });
  };

  const handleStatusChange = async () => {
    if (!changeStatusMutate) return;
    const isConfirm = await confirmationAlert({
      labels: { cancel: "Cancel", confirm: "Confirm" },
      msg: `Are you sure you want to ${status ? "block" : "unblock"}  court ?`,
    });

    if (isConfirm) {
      const response = await changeStatusMutate({
        id,
        status: !status,
      });
      notifications.show({
        message: response.message,
        title: response.title,
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["court", "court_fetch"] });
    }
  };
  return (
    <Button.Group>
      <Tooltip label="Active/Inactive">
        <Button
          variant="default"
          size="compact-md"
          onClick={async () => await handleStatusChange()}
          loading={isStatusPending}
        >
          {status ? <Eye /> : <EyeDisable />}
        </Button>
      </Tooltip>

      <>
        <Tooltip label="Edit">
          <Button
            variant="default"
            size="compact-md"
            onClick={() => {
              modals.closeAll();
              handleOpenEditModal();
            }}
          >
            <Edit />
          </Button>
        </Tooltip>
        <Tooltip label="Delete">
          <Button
            variant="default"
            size="compact-md"
            onClick={async () => await handleDelete()}
            loading={isDeletePending}
          >
            <Delete />
          </Button>
        </Tooltip>
      </>
    </Button.Group>
  );
};

export default CustomerActionBar;
