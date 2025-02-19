import { Flex, Group, UnstyledButton } from "@mantine/core";
import { memo } from "react";
import { useAppSelector } from "../../../app/hooks";
import FTypography from "../../../ui/typography/FTypography";

const UserControl = () => {
  const { username } = useAppSelector((state) => state.userData.userData);
  return (
    <UnstyledButton>
      <Group>
        <Flex direction={"column"}>
          <FTypography
            text={username ?? ""}
            variant="oswald500"
            fontSize={"18px"}
          />
        </Flex>
      </Group>
    </UnstyledButton>
  );
};

export default memo(UserControl);
