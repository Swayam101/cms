import { modals } from "@mantine/modals";
import FTypography from "../../ui/typography/FTypography";
import { ReactNode } from "react";
import { MantineSize } from "@mantine/core";

type IProps = {
  title?: string;
  msg?: string;
  labels?: { confirm: string; cancel: string };
  onConfirm?: () => void;
};
export const confirmationAlert = ({
  labels = { cancel: "Cancel", confirm: "Confirm" },
  title = "Are you sure you want to continue?",
  ...data
}: IProps): Promise<boolean> => {
  return new Promise((resolve) => {
    modals.openConfirmModal({
      title: title,
      centered: true,
      children: (
        <FTypography
          fontSize={"14px"}
          text={data.msg ?? ""}
          variant="oswald500"
        />
      ),
      labels: labels,
      confirmProps: { color: "red" },
      onConfirm: () => {
        resolve(true);
      },
      onCancel: () => {
        resolve(false);
      },
    });
  });
};

export const Modals = ({
  title,
  children,
  centered,
  size = "lg",
}: {
  title: string;
  children: ReactNode;
  centered?: boolean;
  size?: number | string | MantineSize;
}) => {
  modals.open({
    title: <FTypography fontSize={"17px"} text={title} variant="oswald500" />,
    children: children,
    size: size,
    styles: { root: { maxWidth: "400px" } },
    centered: centered,
  });
};
