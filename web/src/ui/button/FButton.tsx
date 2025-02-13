import { Button } from "@mantine/core";
import React, { memo } from "react";
import classes from "./index.module.scss";
import FTypography from "../typography/FTypography";
export type TButtonVariant =
  | "smallBtn"
  | "filled"
  | "outline"
  | "select"
  | "booked"
  | "blocked"
  | "selected"
  | "disabled";
interface IProps {
  label: string;
  variant: TButtonVariant;
  icon?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disable?: boolean;
}
const FButton: React.FC<IProps> = ({
  label,
  icon,
  variant,
  loading,
  onClick,
  disable,
  type = "button",
}) => {
  return (
    <Button
      className={classes[variant]}
      onClick={onClick}
      leftSection={icon}
      loading={loading}
      type={type}
      disabled={disable}
    >
      <FTypography
        fontSize={14}
        text={label}
        variant="nunito700"
        color={variant === "outline" ? "blue" : "white"}
      />
    </Button>
  );
};

export default memo(FButton);
