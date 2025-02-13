import { Checkbox, Group, SimpleGrid } from "@mantine/core";
import React from "react";
import FTypography from "../../typography/FTypography";
import { UseFormReturnType } from "@mantine/form";

interface IProps {
  label: string;
  data: { _id: string; name: string }[];
  form: UseFormReturnType<any>;
  feild: string;
  withGrid?: boolean;
  gridCols?: number;
}

const FCheckBoxGroup: React.FC<IProps> = ({
  label,
  data,
  form,
  feild,
  gridCols,
  withGrid = false,
}) => {
  if (withGrid) {
    return data.length > 0 ? (
      <Checkbox.Group
        label={label}
        {...form.getInputProps(feild, { type: "checkbox" })}
      >
        <Group mt="xs">
          <SimpleGrid
            style={{ width: "100%" }}
            cols={{ base: gridCols, sm: 3, lg: 4, xs: 2 }}
            spacing={{ base: "lg", sm: "sm", lg: "md" }}
          >
            {data.map(({ _id, name }, index) => {
              return (
                <Checkbox
                  value={_id}
                  label={name}
                  key={"checkboxkey" + index}
                />
              );
            })}
          </SimpleGrid>
        </Group>
      </Checkbox.Group>
    ) : (
      <FTypography
        variant="nunito700"
        text="No Courts Available"
        fontSize={16}
      />
    );
  } else {
    return data.length > 0 ? (
      <Checkbox.Group
        label={label}
        {...form.getInputProps(feild, { type: "checkbox" })}
      >
        <Group mt="xs">
          {data.map(({ _id, name }, index) => {
            return (
              <Checkbox value={_id} label={name} key={"checkboxkey" + index} />
            );
          })}
        </Group>
      </Checkbox.Group>
    ) : (
      <FTypography
        variant="nunito700"
        text="No Courts Available"
        fontSize={16}
      />
    );
  }
};

export default FCheckBoxGroup;
