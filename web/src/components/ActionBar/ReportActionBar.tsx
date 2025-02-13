import { Button, Tooltip } from "@mantine/core";
import React from "react";
import Edit from "../../assets/icons/edit";
import Delete from "../../assets/icons/delete";
import { confirmationAlert, Modals } from "../../container/modal/Fmodals";
import ReportModal from "../../container/ReportModal/ReportModal";
import { IReportTable } from "../../types";
import useDeleteReport from "../../hooks/report/useDeleteReport";
import { notifications } from "@mantine/notifications";
import { queryClient } from "../../client/queryClient";
interface IProps {
  values: IReportTable;
}
const ReportActionBar: React.FC<IProps> = ({ values }) => {
  const { mutateAsync, isPending } = useDeleteReport();
  const handleEdit = () => {
    Modals({
      children: <ReportModal reportData={values} isEdit />,
      title: "Update Report",
    });
  };
  const handleDelete = async () => {
    const confirm = await confirmationAlert({
      title: "Confirm Deleting",
      labels: { cancel: "Cancel", confirm: "Confirm" },
      msg: "Are you sure you want to delete this report entry?",
    });
    if (!confirm) {
      return;
    }
    const res = await mutateAsync({ id: values._id });
    if (res.status === "success") {
      notifications.show({ message: res.message, color: "green" });
      queryClient.invalidateQueries({
        queryKey: ["addReport", "getReport", "updateReport"],
      });
    } else {
      notifications.show({ message: res.message, color: "red" });
    }
  };
  return (
    <Button.Group>
      <Tooltip label="Edit">
        <Button variant="default" size="compact-md" onClick={handleEdit}>
          <Edit />
        </Button>
      </Tooltip>

      <Tooltip label="Delete">
        <Button
          variant="default"
          size="compact-md"
          onClick={handleDelete}
          loading={isPending}
        >
          <Delete />
        </Button>
      </Tooltip>
    </Button.Group>
  );
};

export default ReportActionBar;
