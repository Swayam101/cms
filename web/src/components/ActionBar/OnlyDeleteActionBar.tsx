import { memo } from "react";
import { confirmationAlert } from "../../container/modal/Fmodals";
import { Button, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { COLORS } from "../../assets/colors";

import { notifications } from "@mantine/notifications";
import { queryClient } from "../../client/queryClient";
import useDeleteBlockedSlotById from "../../hooks/booking/useDeleteBlockedSlotById";

interface IProps {
  id: string;
}

const CustomPricingActionBar: React.FC<IProps> = ({ id }) => {
  const { mutateAsync, isPending } = useDeleteBlockedSlotById();

  const handleDelete = async () => {
    const confirm = await confirmationAlert({
      title: "Confirm Deleting",
      labels: { cancel: "Cancel", confirm: "Confirm" },
      msg: "Are you sure you want to delete this slot block?",
    });
    if (!confirm) {
      return;
    }
    const response = await mutateAsync(id);

    if (response.status === "error") {
      return notifications.show({
        message: response.message,
        color: "red",
      });
    }
    queryClient.invalidateQueries({
      queryKey: ["getBlockedSlotByCentreAndDate"],
    });
    return notifications.show({
      message: response.message,
      color: "green",
    });
  };

  return (
    <div>
      <Button.Group>
        <Tooltip label={"Delete Blocked Slots"}>
          <Button
            variant="default"
            color="red"
            onClick={() => handleDelete()}
            size="compact-md"
            loading={isPending}
          >
            <IconTrash size={16} color={COLORS.red} />
          </Button>
        </Tooltip>
      </Button.Group>
    </div>
  );
};

export default memo(CustomPricingActionBar);
