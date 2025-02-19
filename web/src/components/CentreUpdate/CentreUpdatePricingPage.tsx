import React, { memo, useMemo } from "react";

import classes from "./index.module.scss";
import useGetCentreById from "../../hooks/centre/useGetUserById";
import { useParams } from "react-router-dom";
import { Box, Loader } from "@mantine/core";
import FTypography from "../../ui/typography/FTypography";

import StaticPriceUpdateForm from "./StaticPriceUpdateForm";
import CustomPricingSection from "./CustomPricingSection";

const CentrePricingUpdatePage: React.FC = () => {
  const { centreId } = useParams();

  const { data, isLoading } = useGetCentreById(centreId ?? "");

  const centreData = useMemo(() => {
    if (data?.data) {
      return data.data;
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Box>
        <Box className={classes.heading}>
          <FTypography
            text={centreData?.name}
            fontSize={"24px"}
            variant="oswald500"
          />
        </Box>
        <StaticPriceUpdateForm
          courtPrice={centreData.priceCourt}
          slotPrice={centreData.priceSlot}
          id={`${centreId}`}
        />
        <hr />
        <CustomPricingSection id={centreId!} />
      </Box>
    </div>
  );
};

export default memo(CentrePricingUpdatePage);
