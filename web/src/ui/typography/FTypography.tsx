import React, { memo } from "react";
import classes from "./index.module.scss";
import { COLORS } from "../../assets/colors";
interface IProps {
  variant: "nunito700" | "oswald500" | "nunito400";
  fontSize: number | string;
  text: string;
  color?: keyof typeof COLORS;
}
const FTypography: React.FC<IProps> = ({
  fontSize,
  variant,
  text,
  color = "headingBlack",
}) => {
  switch (variant) {
    case "nunito700":
      return (
        <p
          className={classes[variant]}
          style={{ fontSize: fontSize, color: COLORS[color] }}
        >
          {text}
        </p>
      );
    case "nunito400":
      return (
        <p
          className={classes.nunito400}
          style={{ fontSize: fontSize, color: COLORS[color] }}
        >
          {text}
        </p>
      );
    case "oswald500":
      return (
        <h2
          className={classes[variant]}
          style={{ fontSize: fontSize, color: COLORS[color] }}
        >
          {text}
        </h2>
      );
    default:
      break;
  }
};

export default memo(FTypography);
