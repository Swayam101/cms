import React, { memo } from "react";
import { notifications } from "@mantine/notifications";
import { Button, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { confirmationAlert, Modals } from "../../container/modals/Fmodals";
import Eye from "../../assets/icons/eye";
import Edit from "../../assets/icons/edit";
import EyeDisable from "../../assets/icons/eyedisable";

import { actionBarEntities } from "./actionBarConfig";
import { queryClient } from "../../client/queryClient";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { IconListDetails } from "@tabler/icons-react";

interface IProps {
  status: boolean;
  id: string;
  entity: keyof typeof actionBarEntities;
  onlyEye?: boolean;
  noDelete?: boolean;
  detailsPage?: boolean;
}

const ActionBar: React.FC<IProps> = ({
  onlyEye,
  status,
  entity,
  id,
  noDelete: _,
  detailsPage,
}) => {
  const { _id } = useAppSelector((state) => state.userData.userData);

  const changeStatusMutate =
    actionBarEntities[entity]?.changeStatusMutation?.();

  const navigate = useNavigate();

  const handleOpenEditModal = () => {
    if (!actionBarEntities[entity].editModal) return;
    Modals({
      children: actionBarEntities[entity]?.editModal(id),
      title: `Edit ${entity.charAt(0).toUpperCase() + entity.slice(1)}`,
    });
  };
  const handleStatusChange = async () => {
    if (!changeStatusMutate) return;
    const isConfirm = await confirmationAlert({
      labels: { cancel: "Cancel", confirm: "Confirm" },
      msg: `Are you sure you want to ${
        status ? "block" : "unblock"
      }  ${entity}?`,
    });

    if (isConfirm) {
      const response = await changeStatusMutate?.mutateAsync({
        id,
        status: !status,
      });
      notifications.show({
        message: response.message,
        title: response.title,
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: [entity] });
    }
  };
  if (_id === id) return null;
  return (
    <Button.Group>
      <Tooltip label="Active/Inactive">
        <Button
          variant="default"
          size="compact-md"
          loading={changeStatusMutate?.isPending}
          onClick={async () => await handleStatusChange()}
        >
          {status ? <Eye /> : <EyeDisable />}
        </Button>
      </Tooltip>
      {!onlyEye && (
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
          {!detailsPage && (
            <Tooltip label="Show Details">
              <Button
                variant="default"
                size="compact-md"
                loading={false}
                onClick={() => {
                  navigate(`/user/details?id=${id}`);
                }}
              >
                <IconListDetails />
              </Button>
            </Tooltip>
          )}
        </>
      )}
    </Button.Group>
  );
};

export default memo(ActionBar);
