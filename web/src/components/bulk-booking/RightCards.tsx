import React from "react";
import { Flex, ScrollArea } from "@mantine/core";
import CardItem from "./CardItem";

const RightCards: React.FC = () => {
  return (
    <Flex ml={"lg"} direction={"column"} gap={"lg"} style={{ width: "50%" }}>
      <ScrollArea mah={900} pr={"sm"}>
        <CardItem
          courtName="Komalnagar Court"
          from="November 16, 2024"
          to="November 16, 2024"
          fromTime="12:00 AM"
          toTime="2:00 AM"
          days={["Sunday", "Monday", "Tuesday"]}
          court={["First", "Second"]}
        />
        <CardItem
          courtName="Komalnagar Court"
          from="November 16, 2024"
          to="November 16, 2024"
          fromTime="12:00 AM"
          toTime="2:00 AM"
          days={["Sunday", "Monday", "Tuesday"]}
          court={["First", "Second"]}
        />
        <CardItem
          courtName="Komalnagar Court"
          from="November 16, 2024"
          to="November 16, 2024"
          fromTime="12:00 AM"
          toTime="2:00 AM"
          days={["Sunday", "Monday", "Tuesday"]}
          court={["First", "Second"]}
        />
        <CardItem
          courtName="Komalnagar Court"
          from="November 16, 2024"
          to="November 16, 2024"
          fromTime="12:00 AM"
          toTime="2:00 AM"
          days={["Sunday", "Monday", "Tuesday"]}
          court={["First", "Second"]}
        />
      </ScrollArea>
    </Flex>
  );
};

export default RightCards;
