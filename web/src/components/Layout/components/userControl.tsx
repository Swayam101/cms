import { Avatar, Flex, Group, UnstyledButton } from "@mantine/core";
import { memo } from "react";
import { useAppSelector } from "../../../app/hooks";
import FTypography from "../../../ui/typography/FTypography";

const UserControl = () => {
  const { name, role, profileImg } = useAppSelector(
    (state) => state.userData.userData
  );
  return (
    <UnstyledButton>
      <Group>
        <Avatar src={profileImg} radius="xl" />
        <Flex direction={"column"}>
          <FTypography
            text={name ?? ""}
            variant="oswald500"
            fontSize={"18px"}
          />
          <FTypography
            text={role ?? ""}
            variant="nunito700"
            fontSize={"14px"}
          />
        </Flex>
      </Group>
    </UnstyledButton>
  );
};

export default memo(UserControl);
