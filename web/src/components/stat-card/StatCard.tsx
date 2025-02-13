import { Box } from "@mantine/core";
import React, { memo } from "react";
import classes from "./index.module.scss";
import FTypography from "../../ui/typography/FTypography";
import { Icons } from "../../assets/icons";
import FImage from "../../ui/fimage/FImage";

interface IProps {
  text: string;
  data: string;
  icon: keyof typeof Icons;
  imgAlt: string;
  variant: "cream" | "white";
}
const StatCard: React.FC<IProps> = ({ data, icon, text, variant, imgAlt }) => {
  return (
    <Box className={`${classes.root} ${classes[variant]} `}>
      <Box className={classes.innerbox}>
        <FTypography
          fontSize={"14px"}
          text={text}
          variant="nunito700"
          color="discriptionBlack"
        />
        <FTypography
          fontSize={"24px"}
          text={data}
          variant="oswald500"
          color="headingBlack"
        />
      </Box>
      <FImage
        alt={imgAlt}
        height={50}
        src={icon}
        width={50}
        className={classes.img}
      />
    </Box>
  );
};

export default memo(StatCard);
