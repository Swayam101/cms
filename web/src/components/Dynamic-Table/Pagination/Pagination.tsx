import React, { memo, useState, useEffect } from "react";
import { Box, Button, ButtonGroup } from "@mantine/core";
import { CONSTANTS } from "../types/constants/index";
import { useDebouncedValue } from "@mantine/hooks";
import { TPaging } from "../types/table/tablePaging";
import Left from "../../../assets/icons/left";
import Right from "../../../assets/icons/right";
import classes from "./index.module.scss";
import FTypography from "../../../ui/typography/FTypography";
import { checkNan } from "../../../utils/checkNan";
const ThemePagination: React.FC<TPaging> = (props) => {
  const { setPage, totalPages, totalDocuments } = props;
  const [active, setActive] = useState(1);
  const [debounce] = useDebouncedValue(active, 200);

  useEffect(() => {
    setPage(debounce);
  }, [debounce, setPage]);

  if (
    (totalDocuments && totalDocuments <= CONSTANTS.PAGE_LIMIT) ||
    totalDocuments === 0
  ) {
    return null;
  }

  const handlePrev = () => {
    if (active > 1) {
      setActive((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (active < totalPages) {
      setActive((prev) => prev + 1);
    }
  };

  return (
    <Box className={classes.root}>
      <FTypography
        fontSize={16}
        text={`Showing ${checkNan(
          active * CONSTANTS.PAGE_LIMIT - (CONSTANTS.PAGE_LIMIT - 1)
        )}-${checkNan(
          Math.min(active * CONSTANTS.PAGE_LIMIT, totalDocuments)
        )} of ${totalDocuments || 0}`}
        variant="nunito700"
        color="black60"
      />
      <ButtonGroup>
        <Button
          variant="default"
          size="compact-md"
          onClick={handlePrev}
          disabled={active === 1}
          className={classes.btn}
        >
          <Left />
        </Button>
        <Button
          variant="default"
          size="compact-md"
          className={classes.btn}
          onClick={handleNext}
          disabled={active === totalPages}
        >
          <Right />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default memo(ThemePagination);
