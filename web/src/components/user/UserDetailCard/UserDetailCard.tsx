import { IconAt, IconPhoneCall } from "@tabler/icons-react";
import { Avatar, Group, Text } from "@mantine/core";
import classes from "./index.module.scss";

interface IProps {
  name: string;
  email: string;
  phone: string;
  image: string;
}

const UserDetailsCard: React.FC<IProps> = ({ email, name, phone, image }) => {
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src={image} size={94} radius="md" />
        <div>
          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {email}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {phone}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
};

export default UserDetailsCard;
