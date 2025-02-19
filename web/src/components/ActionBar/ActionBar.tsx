import React, { memo } from "react";
import { notifications } from "@mantine/notifications";
import { Button, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { confirmationAlert, Modals } from "../../container/modal/Fmodals";
import Eye from "../../assets/icons/eye";
import Edit from "../../assets/icons/edit";
import Delete from "../../assets/icons/delete";
import EyeDisable from "../../assets/icons/eyedisable";

import { actionBarEntities } from "./actionBarConfig";
import { queryClient } from "../../client/queryClient";
import { useAppSelector } from "../../app/hooks";
import Rupee from "../../assets/icons/rupee";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../enum/routes.enum";
import { IconListDetails } from "@tabler/icons-react";

interface IProps {
  status: boolean;
  id: string;
  entity: keyof typeof actionBarEntities;
  onlyEye?: boolean;
  noDelete?: boolean;
  pricing?: boolean;
  detailsPage?: boolean;
}

const ActionBar: React.FC<IProps> = ({
  onlyEye,
  status,
  entity,
  id,
  noDelete,
  pricing,
  detailsPage,
}) => {
  const { _id } = useAppSelector((state) => state.userData.userData);

  const changeStatusMutate =
    actionBarEntities[entity]?.changeStatusMutation?.();

  const deleteEntityMutate = actionBarEntities[entity]?.deleteMutation?.();

  const navigate = useNavigate();

  const { refetch } = actionBarEntities[entity].refetch({
    page: 1,
    limit: 10,
    search: "",
  });

  const handleOpenEditModal = () => {
    if (!actionBarEntities[entity].editModal) return;
    Modals({
      children: actionBarEntities[entity].editModal(id),
      title: `Edit ${entity.charAt(0).toUpperCase() + entity.slice(1)}`,
    });
  };

  const handleDelete = async () => {
    if (!deleteEntityMutate) return;
    const isConfirm = await confirmationAlert({
      labels: { cancel: "Cancel", confirm: "Confirm" },
      msg: `Are you sure you wanna delete this ${entity}?`,
    });

    if (isConfirm) {
      const response = await deleteEntityMutate?.mutateAsync({ id });
      notifications.show({
        message: response.message,
        title: response.title,
        color: "green",
      });
      refetch();
    }
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
          {!noDelete && (
            <Tooltip label="Delete">
              <Button
                variant="default"
                size="compact-md"
                loading={deleteEntityMutate?.isPending}
                onClick={async () => await handleDelete()}
              >
                <Delete />
              </Button>
            </Tooltip>
          )}
          {pricing && (
            <Tooltip label="Update Pricing">
              <Link to={ROUTES.UPDATE_CENTER_PRICING.replace(":centreId", id)}>
                <Button variant="default" size="compact-md">
                  <Rupee />
                </Button>
              </Link>
            </Tooltip>
          )}
        </>
      )}
    </Button.Group>
  );
};

export default memo(ActionBar);
