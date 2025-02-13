import { memo } from "react";
import { confirmationAlert, Modals } from "../../container/modal/Fmodals";
import { Button, Tooltip } from "@mantine/core";
import { IconEdit, IconX } from "@tabler/icons-react";
import { COLORS } from "../../assets/colors";
import CustomPricingModal from "../../container/modal/CustomPricingModal.tsx/CustomPricingModal";
import useDeleteCustomPricing from "../../hooks/centre/useDeleteCustomPricing";
import { notifications } from "@mantine/notifications";
import { queryClient } from "../../client/queryClient";

interface IProps {
  center: string;
  id: string;
}

const CustomPricingActionBar: React.FC<IProps> = ({ center, id }) => {
  const { mutateAsync, isPending } = useDeleteCustomPricing();
  const handleEdit = () => {
    Modals({
      title: "Edit Custom Pricing",
      children: (
        <CustomPricingModal isCreateModal={false} center={center} id={id} />
      ),
    });
  };
  const handleCancel = async () => {
    const confirm = await confirmationAlert({
      title: "Confirm Deleting",
      labels: { cancel: "Cancel", confirm: "Confirm" },
      msg: "Are you sure you want to delete this custom pricing?",
    });
    if (!confirm) {
      return;
    }
    const response = await mutateAsync({
      id,
    });
    if (response.status === "error") {
      return notifications.show({
        message: response.message,
        color: "red",
      });
    }
    queryClient.invalidateQueries({ queryKey: ["centre-custom-pricing"] });
    return notifications.show({
      message: response.message,
      color: "green",
    });
  };

  return (
    <div>
      <Button.Group>
        <Tooltip label="Edit Pricing">
          <Button
            variant="default"
            color="blue"
            onClick={() => handleEdit()}
            size="compact-md"
          >
            <IconEdit size={18} />
          </Button>
        </Tooltip>
        <Tooltip label={"Delete Custom Pricing"}>
          <Button
            variant="default"
            color="red"
            onClick={() => handleCancel()}
            size="compact-md"
            loading={isPending}
          >
            <IconX size={18} color={COLORS.red} />
          </Button>
        </Tooltip>
      </Button.Group>
    </div>
  );
};

export default memo(CustomPricingActionBar);
