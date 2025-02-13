import { Box, Card, Chip, Flex } from "@mantine/core";
import React, { memo } from "react";
import FTypography from "../../../ui/typography/FTypography";
import moment from "moment";

const PreviousSlots: React.FC<{ slots: string[]; bookingDate: string }> = ({
  slots,
  bookingDate,
}) => {
  return (
    <Card shadow="sm" padding="xs" radius="md" withBorder>
      <Flex align={"center"}>
        <FTypography text="Slots" fontSize={16} variant="oswald500" />
        <Box ml={8}>
          <FTypography
            text={`(${moment(bookingDate).format("DD-MM-YYYY")})`}
            fontSize={14}
            variant="oswald500"
          />
        </Box>
      </Flex>

      <Flex mt={4}>
        {slots.map((e) => (
          <Chip key={e} disabled={true} mr={4}>
            {e.replace("SLOT_", "").replace("_", " ")}
          </Chip>
        ))}
      </Flex>
    </Card>
  );
};

export default memo(PreviousSlots);
