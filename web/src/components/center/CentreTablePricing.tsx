import { Box } from "@mantine/core";
import React, { memo } from "react";
import FTypography from "../../ui/typography/FTypography";

interface IProps {
  type: "Weekend" | "Regular";
  value: {
    priceSlot: { weekend: string; regular: string };
    priceCourt: { weekend: string; regular: string };
  };
}

const CentreTablePricing: React.FC<IProps> = ({ value, type }) => {
  return (
    <div>
      <Box style={{ textAlign: "left" }}>
        <FTypography text="Court Price :" fontSize={12} variant="oswald500" />
        <FTypography
          text={
            type === "Regular"
              ? value.priceCourt.regular
              : value.priceCourt.weekend
          }
          fontSize={12}
          variant="nunito400"
        />
      </Box>

      <Box style={{ textAlign: "left" }}>
        <FTypography text="Slot Price :" fontSize={12} variant="oswald500" />
        <FTypography
          text={
            type === "Regular"
              ? value.priceSlot.regular
              : value.priceSlot.weekend
          }
          fontSize={12}
          variant="nunito400"
        />
      </Box>
    </div>
  );
};

export default memo(CentreTablePricing);
