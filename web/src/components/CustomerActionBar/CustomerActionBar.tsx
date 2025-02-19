import { Button, Tooltip } from "@mantine/core";
import React from "react";
import Eye from "../../assets/icons/eye";
import EyeDisable from "../../assets/icons/eyedisable";
import { modals } from "@mantine/modals";
import useChangeCourtStatus from "../../hooks/court/useChangeCourtStatus";
import { confirmationAlert, Modals } from "../../container/modal/Fmodals";
import { notifications } from "@mantine/notifications";
import { queryClient } from "../../client/queryClient";
import CourtModal from "../../container/modal/CustomerModal/CustomerModal";
import Edit from "../../assets/icons/edit";
import { useNavigate } from "react-router-dom";
import { IconBook } from "@tabler/icons-react";

interface IProps {
  status: boolean;
  id: string;
}

const CustomerActionBar: React.FC<IProps> = ({ status, id }) => {
  const { mutateAsync: changeStatusMutate, isPending: isStatusPending } =
    useChangeCourtStatus();

  const navigate = useNavigate();

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
        <Tooltip label="Customer Details">
          <Button
            variant="default"
            size="compact-md"
            onClick={async () => navigate(`/customer/details?id=${id}`)}
          >
            <IconBook />
          </Button>
        </Tooltip>
      </>
    </Button.Group>
  );
};

export default CustomerActionBar;
