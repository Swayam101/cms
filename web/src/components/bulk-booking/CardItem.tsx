import React from "react";
import { Card, Group, Text, Flex, Divider, SimpleGrid } from "@mantine/core";

interface CardProps {
  courtName: string;
  from: string;
  to: string;
  fromTime: string;
  toTime: string;
  days: string[];
  court: string[];
}

const CardItem: React.FC<CardProps> = ({
  courtName,
  from,
  to,
  fromTime,
  toTime,
  days,
  court,
}) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      mb={"lg"}
      style={{
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#fafafa",
      }}
    >
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} size="xl">
          {courtName}
        </Text>
      </Group>

      <Flex direction="row" align="center" mt={"md"}>
        <Text mr={"lg"} fw={500} size="md">
          Date:
        </Text>
        <Text size="sm" c="dimmed">
          {from} &mdash; {to}
        </Text>
      </Flex>

      <Divider mt={"sm"} />

      <Flex direction="row" align="center" mt={"md"}>
        <Text mr={"lg"} fw={500} size="md">
          Time:
        </Text>
        <Text size="sm" c="dimmed">
          {fromTime} &mdash; {toTime}
        </Text>
      </Flex>

      <Divider mt={"sm"} />

      <Flex direction="column" mt={"md"}>
        <Text fw={500} size="md" mb="sm">
          Booked Courts:
        </Text>
        <SimpleGrid cols={3} spacing="lg">
          {court.map((item, index) => (
            <Text key={index} size="sm" c="dimmed">
              {item}
            </Text>
          ))}
        </SimpleGrid>
      </Flex>

      <Divider mt="sm" />
      <Flex direction="column" mt={"md"}>
        <Text fw={500} size="md" mb="sm">
          Booked on Days:
        </Text>
        <SimpleGrid cols={4} spacing="lg">
          {days.map((item, index) => (
            <Text key={index} size="sm" c="dimmed">
              {item}
            </Text>
          ))}
        </SimpleGrid>
      </Flex>
    </Card>
  );
};

export default CardItem;
